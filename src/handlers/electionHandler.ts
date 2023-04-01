import prisma from '../db'


//CREATE
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

//GET SINGLE
export const getAnElection = async (req, res) => {
    try {
        const findElection = await prisma.election.findUnique({
            where: {
                id: req.params.id
            }
        })

        //check if the election exist
        if(!findElection) throw new Error("Election not Found");

        //return json message
        res.json(findElection)
    } catch (error) {
        console.error(error)
        res.status(400).json({error: error.message})
    }
}

//GET ALL
export const getAllElection = async (req, res) => {
    try {
        const allElections = await prisma.election.findMany()

        allElections

        res.json(allElections)
    } catch (error) {
        console.error(error)
        res.status(400).json({error:error.message})
    }
}


//DELETE SINGLE
export const deleteAnElection = async (req, res) => {
    try {
        const findElection = await prisma.election.findUnique({
            where: {
                id: req.params.id
            }
        })
        //check if the election exist
        if(!findElection) throw new Error("Election not Found");
        
        const deletedElection = await prisma.election.delete({
            where: {id: req.params.id}
        })

        //invoke delete election
        deletedElection

        //return json message
        res.json({message: "Election Deleted"})
    } catch (error) {
        console.error(error)
        res.status(400).json({error:error.message})
    }
}

//DELETE ALL
export const deleteAllElection = async (req, res) => {
    try {
        const deletedElections = await prisma.election.deleteMany({})

        //invoke delete all elections
        deletedElections

        //return json message
        res.json({message: "All Election Deleted"})
    } catch (error) {
        console.error(error)
        res.status(400).json({error:error.message})
    }
}


//CONNECT ORG TO ELECTION
export const connectOrg = async (req, res) => {

    try {

        //check if the passed election id exists in the database
        const electionExists = await prisma.election.findUnique({
            where: {
                id: req.body.election_id
            }
          })
        
        if(!electionExists) throw new Error("Election not found");
        
        //check if the passed organization id exists in the database
        const orgExists = await prisma.organization.findUnique({
            where: {
                id: req.body.org_id
            }
          })
        
        if(!orgExists) throw new Error("Organization not found");
        


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
        console.error(error.message)
        res.status(400).json({error: error.message})       
    }
}