import prisma from '../db'


export const createOrg = async (req, res) => {
    try {
        const org = await prisma.organization.create({
            data: {
                org_name: req.body.org_name,
                logo_url: req.body.logo_url,
                startDate: new Date(req.body.start_date),
                endDate: new Date(req.body.end_date),
            }
        })
        res.json(org)
    } catch (error) {
        console.error(error)
        res.status(400).json({error})
    }
}