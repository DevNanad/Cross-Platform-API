import prisma from "../db";
import { validationResult } from "express-validator";
import xlsx from "xlsx"

//UPLOAD SINGLE ID 
export const singleId = async (req, res) => {
    try {
        const idExist = await prisma.id.findUnique({
          where: {student_id: req.body.student_id}
        })

        if(idExist) throw new Error("Student ID Already exists")
        
        const single = await prisma.id.create({
            data: { student_id: req.body.student_id}
        })

        res.json({ message: "ID Uploaded"})
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

//UPLOAD MULTIPLE IDs
export const multipleId = async (req, res) => {
    try {
      const studentIds = req.body.student_ids.split(',')
  
      // Create an array of objects for bulk creation
      const idObjects = studentIds.map(id => ({ student_id: id }));
  
      // Filter out existing IDs from the array
      const existingIds = await prisma.id.findMany({
        where: {
          student_id: {
            in: studentIds
          }
        }
      });
      const newIdObjects = idObjects.filter(obj => {
        return !existingIds.some(existingObj => existingObj.student_id === obj.student_id);
      });
  
      // Create new ID records in the database
      const result = await prisma.id.createMany({
        data: newIdObjects
      });
  
      res.json({ message: `${result.count} IDs uploaded` });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

//UPLOAD XLSX FILE
export const xlsxUploadIds = async (req, res) => {

  
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
        const column = req.body.column || 'A'; // default to column A if not specified
        const sheet = req.body.sheet || 0; // default to first sheet if not specified
      
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[sheet]];
        const ids = [];
      
        for (let i = 2; ; i++) { // start from row 2 (assuming row 1 is the header)
            const cell = worksheet[column + i];
            if (!cell) break; // stop when we reach an empty cell
            const id = cell.v.toString().trim().replace('-', '');
            if (!id.match(/^\d{7}$/)) continue; // ignore non-7-digit IDs
            const existingId = await prisma.id.findUnique({ where: { student_id: id } });
            if (existingId) continue; // ignore existing IDs
            ids.push({ student_id: id });
        }
      
        if (ids.length === 0) {
            return res.status(400).json({ message: 'No valid IDs found in the file' });
        }
        await prisma.id.createMany({ data: ids });
        res.json({ message: `${ids.length} IDs uploaded` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload IDs' });
    }
};

  