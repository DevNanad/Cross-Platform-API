import prisma from '../db'
import { comparePasswords, createJWT, createJWTAdmin, hashPassword } from '../modules/auth'
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


//CHECK ID BEFORE REGISTER THE STUDENT VOTER
export const registerCheckId = async (req, res) => {
  try {
    const id = await prisma.id.findUnique({
      where: { student_id: req.body.student_id }
    })

    if(id) throw new Error("ID Already Taken");
    
    res.json({message: "Happy Registration :)"})
  } catch (error) {
      console.error(error)
      res.status(400).json({error: error.message})
  }
}

//REGISTER Handler
export const register = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                student_id: req.body.student_id,
                password: await hashPassword(req.body.password),
                pin_number: req.body.pin_number,
                mobile_number: req.body.mobile_number
            }
        })
    
        const token = createJWT(user)
        res.json({token})
    } catch (error) {
        console.error(error)
        res.status(400).json({error: error.message})
    }
}


//LOGIN Handler
export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        student_id: req.body.student_id,
      }
    });

    if (!user) {
      return res.status(401).json({ message: "Incorrect password or Id" });
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Incorrect password or Id" });
    }

    const token = createJWT(user);
    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//UPDATE PROFILE (STUDENT ID)
export const changeStudentID = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.student_id
      }
    })
    
    if(!userExists) throw new Error("Student Voter not found");

    //check if the passed new user id already exists in the database
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.new_student_id
      }
    })
    
    if(userAlreadyExists) throw new Error("Student ID Already Taken");


    const studentid = await prisma.user.update({
      where: { student_id: req.body.student_id},
      data:{
        student_id: req.body.new_student_id
      }
    })

    //invoke student update
    studentid

    res.json({message: "Student ID Updated!"})
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})   
  }
}
//UPDATE PROFILE (FULLNAME)
export const changeFullname = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.student_id
      }
    })
    
    if(!userExists) throw new Error("Voter not found");

    const fullname = await prisma.user.update({
      where: { student_id: req.body.student_id},
      data:{
        fullname: req.body.new_fullname
      }
    })

    //invoke fullname update
    fullname

    res.json({message: "Fullname Updated!"})
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})   
  }
}


//UPDATE PROFILE (PICTURE)
export const changePicture = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.student_id
      }
    })
    
    if(!userExists) throw new Error("Voter not found");

    const picture = await prisma.user.update({
      where: { student_id: req.body.student_id},
      data:{
        profile_picture: req.body.new_profile_picture
      }
    })

    //invoke picture update
    picture

    res.json({message: "Profile Picture Updated!"})
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})   
  }
}

// UPDATE PROFILE (CHECK MOBILE NUMBER)
export const checkMobileNumber = async (req, res) => {
  try {
    // Check if the passed user id exists in the database
    const user = await prisma.user.findUnique({
      where: {
        student_id: req.body.student_id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if mobile number is valid (should be Philippine number)
    const lookup = await client.lookups
    .v2.phoneNumbers(req.body.new_mobile_number)
    .fetch();
    const countryCode = lookup.countryCode;
    if (countryCode !== "PH") {
    throw new Error("Invalid phone number. Please provide a valid Philippine phone number.");
    }

    // Check if mobile number is already taken
    const existingUser = await prisma.user.findUnique({
      where: { mobile_number: req.body.new_mobile_number },
    });

    if (existingUser) {
      throw new Error("Mobile number is Taken");
    } else {
      // Send OTP
      const verification = await client.verify.services(
        process.env.TWILIO_OTP_SERVICE
      ).verifications.create({ to: req.body.new_mobile_number, channel: "sms" });

      console.log(verification.status);

      res.json({ message: "Mobile number is Available" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

//UPDATE PROFILE (CONFIRM MOBILE NUMBER)
export const confirmMobileNumber = async (req, res) => {
  try {
    // Check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
        student_id: req.body.student_id
      }
    });
    
    if (!userExists) {
      throw new Error("Voter not Found");
    }

    // Check if mobile number is valid (should be Philippine number)
    const lookup = await client.lookups
    .v2.phoneNumbers(req.body.new_mobile_number)
    .fetch();
    const countryCode = lookup.countryCode;
    if (countryCode !== "PH") {
    throw new Error("Invalid phone number. Please provide a valid Philippine phone number.");
    }

    // Verify OTP
    try {
      const otp = await client.verify
        .v2.services(process.env.TWILIO_OTP_SERVICE)
        .verificationChecks.create({
          to: req.body.new_mobile_number,
          code: req.body.new_otp_code
        });

      if (otp.status !== 'approved') {
        throw new Error("Invalid OTP code");
      }

    } catch (error) {
      throw new Error("Failed to verify OTP code. Please try again.");
    }

    const updateMobileNumber = await prisma.user.update({
      where: {
        student_id: req.body.student_id
      },
      data: {
        mobile_number: req.body.new_mobile_number
      }
    });

    res.json({ message: "Mobile number Updated" });
      
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });   
  }
};



//UPDATE PROFILE (PIN NUMBER)
export const changePin = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.student_id
      }
    })
    
    if(!userExists) throw new Error("Voter not found");

    const pin = await prisma.user.update({
      where: { student_id: req.body.student_id},
      data:{
        pin_number: req.body.new_pin_number
      }
    })

    //invoke PIN update
    pin

    res.json({message: "PIN Number Updated!"})
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})   
  }
}

//UPDATE PROFILE (PASSWORD)
export const changePassword = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.student_id
      }
    })
    
    if(!userExists) throw new Error("Voter not found");

    const password = await prisma.user.update({
      where: { student_id: req.body.student_id},
      data:{
        password: await hashPassword(req.body.new_password)
      }
    })

    //invoke password update
    password

    res.json({message: "Password Updated!"})
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})   
  }
}


//FORGOT PASSWORD
export const forgotPasswordSendOTP = async (req, res) => {
  try {

      // Check if mobile number is valid (should be Philippine number)
      const lookup = await client.lookups
      .v2.phoneNumbers(req.body.mobile_number)
      .fetch();
      const countryCode = lookup.countryCode;
      if (countryCode !== "PH") {
      throw new Error("Invalid phone number. Please provide a valid Philippine phone number.");
      }
      // Check the database if the user number is taken
      const findNumber = await prisma.user.findUnique({
          where: { mobile_number: req.body.mobile_number },
      });
    
      // Check if mobile number is already taken
      if (!findNumber) {
          // Send error message
          throw new Error("No Student with that Number");
      } else {
      
          // Send OTP
          const verification = await client.verify
          .v2.services(process.env.TWILIO_OTP_SERVICE)
          .verifications.create({ to: req.body.mobile_number, channel: "sms" });
          console.log(verification.status);
      
          // Send success message
          res.json({ message: "OTP sent to mobile number." });
      }
  } catch (error) {
  console.error(error);
  res.status(400).json({ error: error.message });
  }

}

//FORGOT THE ACTUAL PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    
    // Check the database if the user number exists
    const findNumber = await prisma.user.findUnique({
      where: { mobile_number: req.body.mobile_number },
    });

    if(!findNumber) throw new Error("Student Voter Not Found");
    
    const password = await prisma.user.update({
      where: { mobile_number: req.body.mobile_number},
      data:{
        password: await hashPassword(req.body.new_password)
      }
    })

    res.json({message: "Password Updated!"})
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})   
  }
}

//FORGOT THE ACTUAL PIN
export const forgotPin = async (req, res) => {
  try {

    // Check the database if the user number exists
    const findNumber = await prisma.user.findUnique({
      where: { mobile_number: req.body.mobile_number },
    });

    if(!findNumber) throw new Error("Student Voter Not Found");
    

    const newpin = await prisma.user.update({
      where: { mobile_number: req.body.mobile_number},
      data:{
        pin_number: req.body.new_pin_number
      }
    })

    res.json({message: "PIN Code Updated!"})
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})   
  }
}

//DELETE VOTER
export const deleteVoter = async (req, res) => {
    try {

        //search the database if voter exist
        const findVoter = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })

        //throw an error if not
        if(!findVoter) throw new Error("Student Voter does not exist");
        

        //delete actual student voter
        const deleteVoter = await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })

        //delete the election history related to student voter
        
        //return response
        res.json({message: "Student Voter deleted Successfully"})
    } catch (error) {
        console.error(error)
        res.status(404).json({error: error.message})
    }
}

//CAST VOTE CONNECTIONS
export const castVoteConnections = async (req, res) => {
    try {
        //check if the passed organization id exists in the database
        const organizationExists = await prisma.organization.findUnique({
            where: {
                id: req.body.organization_id
            }
          })
        
        if(!organizationExists) throw new Error("Organization not found");
        

        //check if the passed user id exists in the database
        const userExists = await prisma.user.findUnique({
            where: {
                student_id: req.body.student_id
            }
          })
        
        if(!userExists) throw new Error("Student Voter not found");


        const candidateIds = req.body.candidate_ids;

        //check if candidates exist
        const candidates = await prisma.candidate.findMany({
        where: {
            id: { in: candidateIds }
        }
        });

        if (candidates.length !== candidateIds.length) {
        // Some candidate IDs do not exist
        throw new Error("One or more candidate do not exist in the database");
        }
        
        
        const castVoteConnectCreate = await Promise.all(
            candidateIds.map((candidateId) =>
              prisma.vote.create({
                data: {
                    organization: {
                      connect: { id: req.body.organization_id }
                    },
                    candidate: {
                      connect: { id: candidateId }
                    },
                    voter: {
                      connect: { student_id: req.body.student_id }
                    }
                }
              })
            )
        )

    
        //invoke vote connections
        castVoteConnectCreate
        //invoke increment votes of every candidates
        
        
        res.json({message: "Vote Connected Successfully"})
    } catch (error) {
        console.error(error.message)

        if (error.code === 'P2002') {
            // handle unique constraint error
            res.status(400).json({error: `Error: ${error.meta.target} must be unique`})
          } else {
            // handle other types of errors
            res.status(404).json({error: `Error: ${error.message}`});
          } 
    }
}

//CAST VOTE
export const castVote = async (req, res) => {
    try {
      const { candidate_ids } = req.body
  
      const updateCandidatesCount = await Promise.all(
        candidate_ids.map((candidateId) =>
          prisma.candidate.update({
            where: {
              id: candidateId,
            },
            data: {
              count: {
                increment: 1,
              },
            },
          })
        )
      )
  
      //invoke update count
      updateCandidatesCount

      res.json({message: "Vote Submitted"})
    } catch (error) {
      console.error(error.message)
      res.status(404).json({ error: error.message })
    }
  }

//GET USER VOTED CANDIDATES BASE ON STUDENT VOTER ID
export const checkVotersVote = async (req, res) => {
  try {

    //check if the passed student voter id exists in the database
    const userExists = await prisma.user.findUnique({
        where: {
            student_id: req.body.student_id
        }
      })
    
    if(!userExists) throw new Error("Student Voter not found");



    const all = await prisma.vote.findMany({
      where: { voterId: req.body.student_id},
      include: { candidate: true}
    })
    
    res.json(all)
  } catch (error) {
    console.error(error.message)
    res.status(404).json({ error: error.message })
  }
}

//ADMIN

//LOGIN
export const adminLogin = async (req, res) => {
  try {
    // Check if the username and password are correct
    const admin = await prisma.admin.findUnique({
      where: { username: req.body.username },
    });
    if (!admin || !(await comparePasswords(req.body.password, admin.password))) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    // Generate a JWT token with isAdmin set to true
    const token = createJWTAdmin(admin)

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

//REGISTER
export const adminRegister = async (req, res) => {
  try {
      const admin = await prisma.admin.create({
          data: {
              username: req.body.username,
              password: await hashPassword(req.body.password)
          }
      })
  
      const token = createJWTAdmin(admin)

      res.json({token})

  } catch (error) {
      console.error(error)
      res.status(400).json({error: error.message})
  }
}

//UPDATE USERNAME
export const updateAdminUsername = async (req, res) => {
  try {

    //check if the passed id exists in the database
    const adminExists = await prisma.admin.findUnique({
      where: {
          id: req.body.id
      }
    })
    
    if(!adminExists) throw new Error("Admin not found");


    //update admin username
    const adminUsername = await prisma.admin.update({
      where:{ id: req.body.id },
      data: { username: req.body.username }
    })

    res.json({message: "Admin Username Updated"})

  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

//UPDATE PASSWORD
export const updateAdminPassword = async (req, res) => {
  try {

    //check if the passe id exists in the database
    const adminExists = await prisma.admin.findUnique({
      where: {
          id: req.body.id
      }
    })
    
    if(!adminExists) throw new Error("Admin not found");


    //update admin password
    const adminPassword = await prisma.admin.update({
      where:{ id: req.body.id },
      data: { password: await hashPassword(req.body.password)  }
    })

    res.json({message: "Admin Password Updated"})

  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}