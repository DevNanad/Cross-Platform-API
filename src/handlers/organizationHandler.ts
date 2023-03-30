import prisma from '../db'


export const createOrg = async (req, res) => {
    try {
        const org = await prisma.organization.create({
            data: {
                org_name: req.body.org_name,
                logo_url: req.body.logo_url,
                startDate: new Date(req.body.start_date),
                endDate: new Date(req.body.end_date),
                ballots: {
                    create: [
                        {tags: 'ballots'}
                    ]
                  },
            }
        })
        res.json(org)
    } catch (error) {
        console.error(error)
        res.status(400).json({error})
    }
}


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