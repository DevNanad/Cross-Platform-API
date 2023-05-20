import prisma from "../db";
import jwt from 'jsonwebtoken'

export const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies
        if(!cookies?.refreshtokeen) return res.sendStatus(401)

        const refToken = cookies.refreshtokeen

        console.log(refToken);
        

        const foundUser = await prisma.user.findFirst({
            where: { refreshToken: refToken}
        })

        if(!foundUser) return res.sendStatus(403) //Forbidden
        
        jwt.verify(
            refToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) =>{
                if(err || foundUser.student_id !== decoded.id) return res.sendStatus(403)
                const accessToken = jwt.sign(
                    { "id": decoded.id, "role": decoded.role },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1m' }
                )
                res.json({accessToken})
                
            }
        )
    } catch (error) {
        console.log(error);
        
    }
}