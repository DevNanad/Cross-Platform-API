import prisma from '../db'
import { comparePasswords, hashPassword } from '../modules/auth'
import jwt from "jsonwebtoken";
import { sendEmail } from '../modules/email';
import { confirmationTemplate } from '../modules/accountTemplate';

export const generateRandomSixDigitNumber = async () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//LOGIN Handler
//PRIMARY LOGIN
export const primaryLogin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        student_id: req.body.student_id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Incorrect password or ID" });
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Incorrect password or ID" });
    }

    res.json({ message: "success", pin: user.pin_number });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ error: "Internal server error" });
  }
};

//FINAL LOGIN
export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        student_id: req.body.student_id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Incorrect password or ID" });
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Incorrect password or ID" });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );
  
    const refreshToken = jwt.sign(
      { id: user.student_id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    await prisma.user.update({
      where: { student_id: user.student_id },
      data: { refreshToken }
    });

    res.cookie('refreshtokeen', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None',
      secure: true
    });

    res.json({ accessToken, role: user.role, pin: user.pin_number, student_id: user.student_id});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET ALL VOTERS
export const getAllVoters = async (req, res) => {
  try {
    const allVoters = await prisma.user.findMany();

    res.json(allVoters);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//GET SINGLE VOTER
export const getVoter = async (req, res) => {
  try {
      //check if the passed user id exists in the database
      const userExists = await prisma.user.findUnique({
        where: {
            student_id: String(req.params.id)
        }
      })
      
      if(!userExists) throw new Error("Student Voter not found");

      const voter = await prisma.user.findUnique({
        where:{student_id: String(req.params.id)}
      })

      res.json({voter});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//UPDATE ADMIN PROFILE
export const updateAdminProfile = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.student_id
      }
    })
    
    if(!userExists) throw new Error("Student Voter not found");
    const info = await prisma.user.update({
      where: { student_id: req.body.student_id},
      data:{
        firstname: req.body.firstname,
        surname: req.body.surname,
        age: req.body.age,
        year_level: req.body.year_level,
      }
    })
    if(!info) throw new Error("Error saving information.");
    res.json({message: "success"})
  } catch (error) {
    res.status(400).json({error: error.message})   
  }
}

//NEW VOTER UPLOAD INFORMATION
export const uploadVoterInfo = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: String(req.body.student_id)
      }
    })
    
    if(!userExists) throw new Error("Voter not found");

    const voterInfo = await prisma.user.update({
      where: { student_id: String(req.body.student_id)},
      data:{
        firstname: String(req.body.firstname),
        surname: String(req.body.surname),
        age: String(req.body.age),
        year_level: String(req.body.year_level)
      }
    })

    res.json({message: "success"})
  } catch (error) {
    res.status(400).json({error: error.message})   
  }
}


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
        firstname: req.body.firstname,
        surname: req.body.surname,
      }
    })

    res.json({message: "Fullname Updated!"})
  } catch (error) {
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
    res.status(400).json({error: error.message})   
  }
}

//UPDATE ROLE (ROLE)
export const changeRole = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.student_id
      }
    })
    
    if(!userExists) throw new Error("Voter not found");

    const role = await prisma.user.update({
      where: { student_id: req.body.student_id},
      data:{
        role: req.body.new_role
      }
    })

    res.json({message: "Role Updated!"})
  } catch (error) {
    res.status(400).json({error: error.message})   
  }
}





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
    res.status(400).json({error: error.message})   
  }
}


//UPDATE  EMAIL (SEND OTP)
export const changeEmailSend = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: req.body.student_id
      }
    })
    
    if(!userExists) throw new Error("Voter not found");

    //check if the passed email exists in the database
    const emailExists = await prisma.user.findUnique({
      where: {
          email: req.body.new_email
      }
    })
    if(emailExists) throw new Error("Email already taken.");

    const existingCodeRequest = await prisma.code.findUnique({
      where: {
          email: req.body.new_email
      }
    })

    if(existingCodeRequest){
        await prisma.code.delete({
            where: {
                email: req.body.new_email
            }
        })
    }

    const code = await generateRandomSixDigitNumber()

    const from = "CICT-VotingSystem <noreply@ourcict.vercel.app>"
    const subject = "[CICT-VotingSystem] Verify your new Email"
    const text = confirmationTemplate(String(code))

    await sendEmail(
            from,
            req.body.new_email,
            subject,
            text
    )

    await prisma.code.create({
      data: {
          email: req.body.new_email,
          verification_code: String(code)
      }
    })

    res.json({message: "success"})
  } catch (error) {
    res.status(400).json({error: error.message})   
  }
}

//UPDATE PROFILE (PASSWORD)
export const changePassword = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const user = await prisma.user.findUnique({
      where: {
        student_id: req.body.student_id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Incorrect password or ID" });
    }

    const isValid = await comparePasswords(req.body.current_password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

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
    res.status(400).json({error: error.message})   
  }
}

//FORGOT PIN 
export const forgotPinSendOTP = async (req, res) => {
  try {
      const { student_id } = req.body
      const student = await prisma.user.findUnique({
          where: { student_id },
      });
    
      // Check if user exist
      if (!student) {
          // Send error message
          throw new Error("Student not found");
      } else {
      
          // Send OTP to email
          const existingCodeRequest = await prisma.code.findUnique({
            where: {
                email: student.email
            }
          })
      
          if(existingCodeRequest){
              await prisma.code.delete({
                  where: {
                      email: student.email
                  }
              })
          }
      
          const code = await generateRandomSixDigitNumber()
      
          const from = "CICT-VotingSystem <noreply@ourcict.vercel.app>"
          const subject = "[CICT-VotingSystem] Forgot Pin OTP code"
          const text = confirmationTemplate(String(code))
      
          await sendEmail(
                  from,
                  student.email,
                  subject,
                  text
          )
      
          await prisma.code.create({
            data: {
                email: student.email,
                verification_code: String(code)
            }
          })
          // Send success message
          res.json({ message: "success" });
      }
  } catch (error) {
  res.status(400).json({ error: error.message });
  }

}


//FORGOT PASSWORD
export const forgotPasswordSendOTP = async (req, res) => {
  try {
      const { email } = req.body

      // Check the database if the user email is taken
      const findEmail = await prisma.user.findUnique({
          where: { email },
      });
    
      // Check if mobile number is already taken
      if (!findEmail) {
          // Send error message
          throw new Error("No Student with that Email");
      } else {
      
          // Send OTP to email
          const existingCodeRequest = await prisma.code.findUnique({
            where: {
                email: req.body.email
            }
          })
      
          if(existingCodeRequest){
              await prisma.code.delete({
                  where: {
                      email: req.body.email
                  }
              })
          }
      
          const code = await generateRandomSixDigitNumber()
      
          const from = "CICT-VotingSystem <noreply@ourcict.vercel.app>"
          const subject = "[CICT-VotingSystem] Reset Password OTP code"
          const text = confirmationTemplate(String(code))
      
          await sendEmail(
                  from,
                  req.body.email,
                  subject,
                  text
          )
      
          await prisma.code.create({
            data: {
                email: req.body.email,
                verification_code: String(code)
            }
          })
          // Send success message
          res.json({ message: "success" });
      }
  } catch (error) {
  res.status(400).json({ error: error.message });
  }

}

//OTP VERIFY
export const verifyOtp = async (req, res)=> {
  try {
      const {
          email,
          otp_code,
      }= req.body

      //check if email is unique
      const uniqueEmail = await prisma.user.findUnique({
          where:{
              email
          },
      }) 
      if(!uniqueEmail) throw new Error("Email not found")

      //check if verification code is valid
      const isValidCode = await prisma.code.findFirst({
        where: {
          AND: [
            {
              email
            },
            {
              verification_code: String(otp_code)
            }
          ]
        }
      })

      if (!isValidCode) throw new Error("Invalid verification code")

      await prisma.code.delete({
          where: {
              verification_code: String(otp_code)
          }
      })
      res.status(200).json({message: "success"})

  } catch (error:any) {
      res.status(400).json({error:error.message})
  }
}

//FORGOT PIN OTP VERIFY
export const forgotPinConfirmOTP = async (req, res)=> {
  try {
      const {
          student_id,
          otp_code,
      }= req.body

      //check if email is unique
      const student = await prisma.user.findUnique({
          where:{
              student_id
          },
      }) 
      if(!student) throw new Error("Student not found")

      //check if verification code is valid
      const isValidCode = await prisma.code.findFirst({
        where: {
          AND: [
            {
              email: student.email
            },
            {
              verification_code: String(otp_code)
            }
          ]
        }
      })

      if (!isValidCode) throw new Error("Invalid verification code")

      await prisma.code.delete({
          where: {
              verification_code: String(otp_code)
          }
      })
      res.status(200).json({message: "success"})

  } catch (error:any) {
      res.status(400).json({error:error.message})
  }
}
//CHANGE EMAIL (CONFIRM)
export const confirmChangeEmail = async (req, res)=> {
  try {
      const {
          email,
          student_id,
          otp_code,
      }= req.body


      //check if verification code is valid
      const isValidCode = await prisma.code.findFirst({
          where: {
            AND: [
              {
                email
              },
              {
                verification_code: String(otp_code)
              }
            ]
          }
      })

      if (!isValidCode) throw new Error("Invalid verification code")
      
      //change actual email
      const updateEmail = await prisma.user.update({
        where: {
          student_id
        },
        data: {
          email
        }
      })
      if (!updateEmail) throw new Error("Error updating email.")

      await prisma.code.delete({
          where: {
              verification_code: String(otp_code),
          }
      })
      res.status(200).json({message: "success"})
      
  } catch (error:any) {
      res.status(400).json({error:error.message})
  }
}


//FORGOT THE ACTUAL PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    
    // Check the database if the user email exists
    const findEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if(!findEmail) throw new Error("Student Voter Not Found");
    
    const password = await prisma.user.update({
      where: { email: req.body.email},
      data:{
        password: await hashPassword(req.body.new_password)
      }
    })

    res.json({message: "success"})
  } catch (error) {
    res.status(400).json({error: error.message})   
  }
}

//FORGOT THE ACTUAL PIN
export const forgotPin = async (req, res) => {
  try {

    // Check the database if the user number exists
    const findEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if(!findEmail) throw new Error("Student Voter Not Found");
    

    const newpin = await prisma.user.update({
      where: { email: req.body.email},
      data:{
        pin_number: req.body.new_pin_number
      }
    })

    res.json({message: "PIN Code Updated!"})
  } catch (error) {
    res.status(400).json({error: error.message})   
  }
}

//FORGOT THE ACTUAL PIN USING STUDENT ID
export const resetPin = async (req, res) => {
  try {
    const {student_id, new_pin_code} = req.body

    // Check the database if the user number exists
    const user = await prisma.user.findUnique({
      where: { student_id },
    });

    if(!user) throw new Error("Student Voter Not Found");
    
    
    const newpin = await prisma.user.update({
      where: {student_id},
      data:{
        pin_number: String(new_pin_code)
      }
    })
    
    if(!newpin) throw new Error("Error changing PIN");

    res.json({message: "success"})
  } catch (error) {
    res.status(400).json({error: error.message})   
  }
}

//DELETE VOTER
export const deleteVoter = async (req, res) => {
    try {

        //search the database if voter exist
        const findVoter = await prisma.user.findUnique({
            where: {
                student_id: req.params.id
            }
        })

        //throw an error if not
        if(!findVoter) throw new Error("Student Voter does not exist");
        

        //delete actual student voter
        const deleteVoter = await prisma.user.delete({
            where: {
                student_id: req.params.id
            }
        })

        const deleteUserActivities = await prisma.activity.deleteMany({
          where: {
            userId: req.params.id
          }
        })

        const deleteId = await prisma.id.deleteMany({
          where: {
            student_id: req.params.id
          }
        })

        //delete the election history related to student voter
        
        //return response
        res.json({message: "Student Voter deleted Successfully"})
    } catch (error) {
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
        
        if(!userExists) throw new Error("Student Voter not found")

        const { vote } = req.body.vote;
        for(const positionVote of vote) {
          const { position, voted_ids } = positionVote;

          //check if candidates exist
          // const candidates = await prisma.candidate.findMany({
          // where: {
          //     id: { in: voted_ids }
          // }
          // });

          // if (candidates.length !== voted_ids.length) {
          // // Some candidate IDs do not exist
          // throw new Error("One or more candidate do not exist in the database");
          // }

          const castVoteConnectCreate = await Promise.all(
            voted_ids.map((candidateId) =>
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


          const updateCandidatesCount = await Promise.all(
            voted_ids.map((candidateId) =>
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
          
          // Fetch the existing voted_candidates array from the database
          const seat = await prisma.seat.findUnique({
            where: { id: position },
            select: { voted_candidates: true },
          });
          

          const mergedCandidates = seat?.voted_candidates ?? [];
          mergedCandidates.push(...voted_ids);

          // Update the voted_candidates field by merging the arrays
          await prisma.seat.update({
            where: { id: position },
            data: { voted_candidates: mergedCandidates },
          });
        }

        //add voted activity to the user
        const votedActivity = await prisma.activity.create({
          data: {
            type: "voted",
            user: { connect: { student_id: req.body.student_id } },
          },
        });
        
        res.json({message: "Vote Connected Successfully"})
    } catch (error) {
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
    res.status(404).json({ error: error.message })
  }
}

//get the daily user registration
export const userAnalyticsPastWeek = async (req, res) => {
  const today = new Date();
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const registrations = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: oneWeekAgo,
      },
    },
  });
  const groupedRegistrations = groupByDay(registrations);
  res.json(groupedRegistrations);
};

function groupByDay(registrations) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const groups = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const formattedDate = date.toDateString();
    const registrationsOnDay = registrations.filter(
      (registration) => registration.createdAt.toDateString() === formattedDate
    ).length;
    groups.push([dayOfWeek, registrationsOnDay]);
  }
  return groups;
}



//ACITVITY

//type VOTED  
export const getAllActivitytypeVoted = async (req, res) => {
  try {

    const [count, activities] = await Promise.all([
      prisma.activity.count({ where: { type: 'voted' } }),
      prisma.activity.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        where: { type: 'voted' },
        include: {
          user: {
            select: {
              profile_picture: true,
              firstname: true,
              surname: true
            },
          },
        },
      }),
    ]);

    console.log(activities.length);

    if(activities.length === 0) {
      throw new Error("No Activity");
    }
    
    res.json({count,activities})
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

//RECOVER VOTERS ACCOUNT
export const recoverAccount = async (req, res) => {
  try {
    //check if the passed user id exists in the database
    const userExists = await prisma.user.findUnique({
      where: {
          student_id: String(req.body.student_id)
      }
    })

    if(!userExists) throw new Error("Voter not found");

    // Check if mobile number is already taken
    const existingEmail = await prisma.user.findUnique({
      where: { email: String(req.body.email) },
    });
    if(existingEmail) throw new Error("Email Number Already taken")

    const password = await prisma.user.update({
      where: { student_id: String(req.body.student_id)},
      data:{
        password: await hashPassword(String(req.body.new_password)),
        email: String(req.body.email),
        pin_number: String(req.body.pin_code)
      }
    })
    
    res.json({message: 'success'})
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}


//DELETING ACTIVITIES
export const deleteActivities = async (req, res) => {
  try {
      const deleteAct = await prisma.activity.deleteMany({})

      if(deleteAct){
        res.json({message: "success"})
      }else{
        res.json({message: "Deleting activities warn"})
      }
  } catch (error) {
      res.status(404).json({error: error.message})
  }
}
