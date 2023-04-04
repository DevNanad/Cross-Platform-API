import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'


//REGISTER Handler
export const register = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                student_id: req.body.student_id,
                password: await hashPassword(req.body.password),
                pin_number: req.body.pin_number,
                mobile_number: req.body.mobile_number
            }
        })
    
        const token = createJWT(user)
        res.json({token})
    } catch (error) {
        console.error(error)
        res.status(400).json({error: error})
    }
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


export const deleteVoter = async (req, res) => {
    try {

        //search the database if voter exist
        const findVoter = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })

        //throw an error if not
        if(!findVoter) throw new Error("Student Voter does not exist");
        

        //delete actual student voter
        const deleteVoter = await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })

        //delete the election history related to student voter
        const deleteElectionHistory = await prisma.electionhistory.deleteMany({
            where: {
                voterId: req.params.id
            }
        })

        //invoke delete user
        deleteVoter
        //invoke delete elechistory
        deleteElectionHistory
        //return response
        res.json({message: "Student Voter deleted Successfully"})
    } catch (error) {
        console.error(error)
        res.status(404).json({error: error.message})
    }
}