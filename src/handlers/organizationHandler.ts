import prisma from '../db'


//CREATE ORGANIZATION
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

//GET ALL 
export const getAllOrg = async (req, res) => {
    try {
        const allOrganizations = await prisma.organization.findMany()

        res.json(allOrganizations)
    } catch (error) {
        console.error(error)
        res.status(400).json({error:error.message})
    }
}

//GET SINGLE
export const getAnOrg = async (req, res) => {
    try {
        const findOrganization = await prisma.organization.findUnique({
            where: {
                id: req.params.id
            }
        })

        //check if the organization exist
        if(!findOrganization) throw new Error("Organization not Found");

        //return json message
        res.json(findOrganization)
    } catch (error) {
        console.error(error)
        res.status(400).json({error: error.message})
    }
}

//DELETE ALL
export const deleteAllOrg = async (req, res) => {
    try {
        const deletedOrganizations = await prisma.organization.deleteMany({})

        //invoke delete all organizations
        deletedOrganizations

        //return json message
        res.json({message: "All Organizations Deleted"})
    } catch (error) {
        console.error(error)
        res.status(400).json({error:error.message})
    }
}