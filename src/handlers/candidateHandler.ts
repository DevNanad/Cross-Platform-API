import prisma from '../db'


//CREATE
export const createCandidate = async (req, res) => {
    try {
        const candidate = await prisma.candidate.create({
            data: {
                fullname: req.body.fullname,
                platform: req.body.platform,
                party: req.body.party,
                imageUrl: req.body.imageUrl
            }
        })
        res.json(candidate)
    } catch (error) {
        res.status(400).json({error})
    }
}

//GET SINGLE
export const getACandidate = async (req, res) => {
    try {
        const findCandidate = await prisma.candidate.findUnique({
            where: {
                id: req.params.id
            }
        })

        //check if the candidate exist
        if(!findCandidate) throw new Error("Candidate not Found");

        //return json message
        res.json(findCandidate)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//GET ALL
export const getAllCandidate = async (req, res) => {
    try {
      const allCandidates = await prisma.candidate.findMany();
  
      res.json(allCandidates);
    } catch (error){
      res.status(404).json({ error: error.message });
    }
};

//GET ALL DISCONNECTED CANDIDATE
export const getAllNullCandidate = async (req, res) => {
  try {
      const nullCandi = await prisma.candidate.findMany({
          where: {
              seatId: null
          }
      })

      res.json(nullCandi)
  } catch (error) {
      res.status(404).json({error: error.message})
  }
}

//GET ALL CANDIDATES BASE ON POSITION ID
export const posCandidate = async (req, res) => {
  try {
      const positions = await prisma.candidate.findMany({
          where: {
              seatId: req.params.id
          }
      });
      if (!positions) {
          throw new Error(`Candidates not found for pasition ID ${req.params.id}`);
      }
      res.status(200).json(positions);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
};


//DELETE SINGLE
export const deleteACandidate = async (req, res) => {
    try {
        const findCandidate = await prisma.candidate.findUnique({
            where: {
                id: req.params.id
            }
        })
        //check if the candidate exist
        if(!findCandidate) throw new Error("Candidate not Found");
        
        const deletedCandidate = await prisma.candidate.delete({
            where: {id: req.params.id}
        })

        //invoke delete candidate
        deletedCandidate

        //return json message
        res.json({message: "Candidate Deleted"})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}  

//UPDATE SINGLE
export const updateACandidate = async (req, res) => {
    try {
      const findCandidate = await prisma.candidate.findUnique({
        where: {
          id: req.params.id,
        },
      });
      //check if the candidate exist
      if (!findCandidate) throw new Error("Candidate not Found");
  
      const updatedCandidate = await prisma.candidate.update({
        where: {
          id: req.params.id,
        },
        data: {
          fullname: req.body.fullname,
          platform: req.body.platform,
          party: req.body.party,
          imageUrl: req.body.imageUrl
        },
      });
  
      //invoke update candidate
      updatedCandidate
  
      //return json message
      res.json({ message: "Candidate Updated" });
    } catch (error){
      res.status(404).json({ error: error.message });
    }
  };




//CONNECT CANDIDATE TO SEAT
export const candidateToSeat = async (req, res) => {
    try {

        //check if the passed ballot id exists in the database
        const seatExists = await prisma.seat.findUnique({
            where: {
                id: req.body.seat_id
            }
          })
        
        if(!seatExists) throw new Error("Seat not found");
        
        //check if the passed seat id exists in the database
        const candidateExists = await prisma.candidate.findUnique({
            where: {
                id: req.body.candidate_id
            }
          })
        
        if(!candidateExists) throw new Error("Candidate not found");
        


        const connectCandidateToSeat = await prisma.seat.update({
            where:{
                id: req.body.seat_id
            },
            data: {
                candidates: {
                    connect: {
                        id: req.body.candidate_id
                    }
                }
            }
        })
        res.json({ message: "Candidate Connected to Seat"})
    } catch (error) {
        res.status(404).json({error: error.message})       
    }
}


// DISCONNECT CANDIDATE FROM SEAT
export const disconnectCandidateFromSeat = async (req, res) => {
    try {
      // Check if the passed seat id exists in the database
      const seatExists = await prisma.seat.findUnique({
        where: {
          id: req.body.seat_id
        }
      });
  
      if (!seatExists) throw new Error("Seat not found");
  
      // Check if the passed candidate id exists in the database
      const candidateExists = await prisma.candidate.findUnique({
        where: {
          id: req.body.candidate_id
        }
      });
  
      if (!candidateExists) throw new Error("Candidate not found");
  
      const disconnectCandidateFromSeat = await prisma.seat.update({
        where: {
          id: req.body.seat_id
        },
        data: {
          candidates: {
            disconnect: {
              id: req.body.candidate_id
            }
          }
        }
      });
      
      res.json({ message: "Candidate Disconnected from Seat" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  