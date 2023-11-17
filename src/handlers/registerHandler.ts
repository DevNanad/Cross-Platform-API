import prisma from "../db";
import { validationResult } from "express-validator";
import xlsx from "xlsx"
import { hashPassword } from "../modules/auth";
import { newAccountTemplate } from "../modules/accountTemplate";
import { sendEmail } from "../modules/email";

// Function to generate a random password
const generateRandomPassword = () => {
    const length = 10;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
};
// Function to generate a random 4-digit PIN
const generateRandomPIN = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

//REGISTER SINGLE STUDENT
export const registerSingleStudent = async (req, res) => {
  try {
    const {student_id, student_email} = req.body
    // Check if user with the same ID or email already exists
    const checkSID = await prisma.user.findUnique({
      where: {
        student_id: String(student_id)
      }
    })

    if(checkSID) throw new Error("Student ID number already taken.")
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: String(student_email)
      }
    })

    if(checkEmail) throw new Error("Student Email already taken.")

    const password = generateRandomPassword();
    const pin = generateRandomPIN();

    const user = await prisma.user.create({
      data: {
        student_id: String(student_id),
        email: String(student_email),
        password: await hashPassword(password),
        pin_number: pin,
      }
    })

    const from = "CICT-VotingSystem <noreply@ourcict.vercel.app>"
    const subject = "[CICT-VotingSystem] Your CICT Voting System account"
    const text = newAccountTemplate(String(user.student_id), String(password), String(user.pin_number))

    await sendEmail(
            from,
            user.email,
            subject,
            text
    )
    res.status(200).json({message: "success"})
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

// REGISTER USING XLSX FILE
export const xlsxRegister = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      // Check if file exists in the request
      if (!req.file) {
        return res.status(400).json({ message: 'File is required' });
      }
  
      const file = req.file;
      const idColumn = req.body.idColumn || 'A'; // default to column A if not specified
      const emailColumn = req.body.emailColumn || 'B'; // update to the correct column for emails
      const sheet = req.body.sheet || 0; // default to first sheet if not specified
  
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[sheet]];
      const accounts = [];
      const taken = [];
  
      for (let i = 2; ; i++) {
        // Start from row 2 (assuming row 1 is the header)
        const idCell = worksheet[idColumn + i];
        const emailCell = worksheet[emailColumn + i];
  
        if (!idCell || !emailCell) break; // Stop when we reach an empty cell
  
        const id = idCell.v.toString().trim().replace('-', '');
        const email = emailCell.v.toString().trim();
  
        if (!id.match(/^\d{6,7}$/)) continue; // Ignore non 6 or 7-digit IDs

        // Check if user with the same ID or email already exists
        const existingUser = await prisma.user.findFirst({
            where: {
            OR: [
                { student_id: id },
                { email: email },
            ],
            },
        })
        if (existingUser) {
          taken.push({student_id: id, email})
          continue
        } // Ignore existing IDs or emails

        const password = generateRandomPassword();
        const pin = generateRandomPIN();

        const user = await prisma.user.create({
            data: {
                student_id: id,
                password: await hashPassword(password),
                pin_number: pin,
                email
            }
        });
        accounts.push({ student_id: id, email });

        const from = "CICT-VotingSystem <noreply@ourcict.vercel.app>"
        const subject = "[CICT-VotingSystem] Your CICT Voting System account"
        const text = newAccountTemplate(String(user.student_id), String(password), String(user.pin_number))

        await sendEmail(
                from,
                user.email,
                subject,
                text
        )
      }

      if (accounts.length === 0) {
        if(taken.length > 0){
          return res.status(200).json({ message: `${taken.length} taken accounts` });
        }else{
          return res.status(400).json({ message: 'No valid IDs or Emails found in the file' })
        }
      }
  
      res.status(200).json({ message: `${accounts.length} accounts created and emails sent | ${taken.length} taken accounts` });
    } catch (error) {
      res.json({ error: 'Failed to create accounts and send emails' });
    }
};
  