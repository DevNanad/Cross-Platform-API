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
        console.error(error)
        res.status(400).json({error})
    }
}

//GET ALL
export const getAllCandidate = async (req, res) => {
    try {
      const allCandidates = await prisma.candidate.findMany();
  
      res.json(allCandidates);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };


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
        res.json(connectCandidateToSeat)
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error: error.message})       
    }
}