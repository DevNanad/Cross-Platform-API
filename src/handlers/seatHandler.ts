import prisma from '../db'



//CREATE SEAT
export const createSeat = async (req, res) => {
    try {
        const seat = await prisma.seat.create({
            data: {
                position: String(req.body.position),
                requiredWinner: String(req.body.requiredWinner),
                position_order: String(req.body.position_order)
            }
        })
        res.json(seat)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//GET ALL
export const getAllSeat = async (req, res) => {
    try {
        const allSeat = await prisma.seat.findMany({})

        res.json(allSeat)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//GET ALL DISCONNECTED SEAT
export const getAllNullSeat = async (req, res) => {
    try {
        const nullSeat = await prisma.seat.findMany({
            where: {
                ballotId: null
            }
        })

        res.json(nullSeat)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


//DELETE SINGLE
export const deleteASeat = async (req, res) => {
    try {
        const findSeat = await prisma.seat.findUnique({
            where: {
                id: req.params.id
            }
        })
        //check if the seat exist
        if(!findSeat) throw new Error("Seat not Found");
        
        const deletedSeat = await prisma.seat.delete({
            where: {id: req.params.id}
        })

        //invoke delete seat
        deletedSeat

        //return json message
        res.json({message: "Seat Deleted"})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

//UPDATE SINGLE
export const updateAPosition = async (req, res) => {
    try {
      const findPosition = await prisma.seat.findUnique({
        where: {
          id: req.params.id,
        },
      });
      //check if the Position exist
      if (!findPosition) throw new Error("Position not Found");
  
      const updatedPosition = await prisma.seat.update({
        where: {
          id: req.params.id,
        },
        data: {
            position: String(req.body.position),
            requiredWinner: String(req.body.requiredWinner),
            position_order: String(req.body.position_order)
        },
      });
  
      //invoke update Position
      updatedPosition
  
      //return json message
      res.json({ message: "Position Updated" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };



//CONNECT SEAT TO BALLOT
export const seatToballot = async (req, res) => {
    try {

        //check if the passed ballot id exists in the database
        const ballotExists = await prisma.ballot.findUnique({
            where: {
                id: req.body.ballot_id
            }
          })
        
        if(!ballotExists) throw new Error("Ballot not found");
        
        //check if the passed seat id exists in the database
        const seatExists = await prisma.seat.findUnique({
            where: {
                id: req.body.seat_id
            }
          })
        
        if(!seatExists) throw new Error("Seat not found");
        


        const connectSeatToBallot = await prisma.ballot.update({
            where:{
                id: req.body.ballot_id
            },
            data: {
                seats: {
                    connect: {
                        id: req.body.seat_id
                    }
                }
            }
        })
        res.json({ message: "Seat Connected to Ballot" })
    } catch (error) {
        res.status(404).json({error: error.message})       
    }
}

//DISCONNECT SEAT FROM BALLOT
export const disconnectSeatFromBallot = async (req, res) => {
    try {
        //check if the passed ballot id exists in the database
        const ballotExists = await prisma.ballot.findUnique({
            where: {
                id: req.body.ballot_id
            }
        })
        
        if (!ballotExists) throw new Error("Ballot not found");
        
        //check if the passed seat id exists in the database
        const seatExists = await prisma.seat.findUnique({
            where: {
                id: req.body.seat_id
            }
        })
        
        if (!seatExists) throw new Error("Seat not found");

        const disconnectSeatFromBallot = await prisma.ballot.update({
            where: {
                id: req.body.ballot_id
            },
            data: {
                seats: {
                    disconnect: {
                        id: req.body.seat_id
                    }
                }
            }
        })

        res.json({ message: "Seat Disconnected from Ballot" });
    } catch (error) {
        res.status(404).json({ error: error.message });       
    }
}


//GET ALL SEAT BASE ON ORG ID
export const orgBaseSeatID = async (req, res) => {
    try {
        const ballot = await prisma.ballot.findFirst({
            where: {
                organizationId: req.params.id
            },
            include: {
                seats: {
                    include: {
                        candidates: true
                    }
                }
            }
        });
        if (!ballot) {
            throw new Error(`Ballot not found for organization ID ${req.params.id}`);
        }
        res.status(200).json(ballot);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//GET ALL SEAT BASE ON BALLOT ID
export const ballotBaseSeatID = async (req, res) => {
    try {
        const positions = await prisma.seat.findMany({
            where: {
                ballotId: req.params.id
            },
            include: {
                candidates: true
            }
        });
        if (!positions) {
            throw new Error(`Positions not found for ballot ID ${req.params.id}`);
        }
        res.status(200).json(positions);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

