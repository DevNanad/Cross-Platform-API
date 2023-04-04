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

//GET ALL
export const getAllSeat = async (req, res) => {
    try {
        const allSeat = await prisma.seat.findMany({})

        res.json(allSeat)
    } catch (error) {
        console.error(error.message)
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
        console.error(error)
        res.status(404).json({error:error.message})
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
        res.status(404).json({error: error.message})       
    }
}