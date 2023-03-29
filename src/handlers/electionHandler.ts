import prisma from '../db'



export const createElection = async (req, res) => {
    try {
        const election = await prisma.election.create({
            data: {
                title: req.body.title,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate)
            }
        })
        res.json(election)
    } catch (error) {
        console.error(error)
        res.status(400).json({error})
    }
}