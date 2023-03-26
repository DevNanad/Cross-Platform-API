import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'


//REGISTER Handler
export const register = async (req, res) => {

    const user = await prisma.user.create({
        data: {
            student_id: req.body.student_id,
            password: await hashPassword(req.body.password)
        }
    })

    const token = createJWT(user)
    res.json({token})
}



//LOGIN Handler
export const login = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            student_id: req.body.student_id,
        }
    })

    if(!user){
        res.status(401)
        res.json({ message: "Incorrect password or Id"})
        return
    }

    const isValid = await comparePasswords(req.body.password, user.password)

    if(!isValid) {
        res.status(401)
        res.json({ message: "Incorrect password or Id"})
        return
    }

    const token = createJWT(user)
    res.json(token)
}