import prisma from '../db'



export const createElection = async (req, res) => {
    try {
        const election = await prisma.election.create({
            data: {
                title: req.body.title,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),
            }
        })
        res.json(election)
    } catch (error) {
        console.error(error)
        res.status(400).json({error})
    }
}

//connect an organization to election
export const connectOrg = async (req, res) => {
    try {
        const connectOrgToElection = await prisma.election.update({
            where:{
                id: req.body.election_id
            },
            data: {
                organizations: {
                    connect: {
                        id: req.body.org_id
                    }
                }
            }
        })
        res.json(connectOrgToElection)
    } catch (error) {
        console.error(error)
        res.status(400).json({error})       
    }
}