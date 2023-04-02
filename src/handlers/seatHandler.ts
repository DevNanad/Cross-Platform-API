import prisma from '../db'



//CREATE SEAT
export const createSeat = async (req, res) => {
    try {
        const seat = await prisma.seat.create({
            data: {
                position: req.body.position,
            }
        })
        res.json(seat)
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error: error.message})
    }
}


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
        res.json(connectSeatToBallot)
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error: error.message})       
    }
}