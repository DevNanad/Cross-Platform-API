import prisma from '../db'



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