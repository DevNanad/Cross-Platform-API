import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import prisma from "../db";


export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

export const generateAdmin = async (req, res, next) => {
    try {
        //check if there is no admin
        const admin = await prisma.user.findFirst({
            where: {
                role: 'admin'
            }
        })

        if(!admin) {
            await prisma.user.create({
                data: {
                    student_id: '0000000',
                    password: await hashPassword('admin00'),
                    pin_number: '1111'
                }
            })
            return next()
        }

        return next()
    } catch (error) {
        console.log(error.message)
        
    }
}



// Middleware function to check if the user is an administrator
export const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    // Verify the JWT token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err || decodedToken.role !== "admin") {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decodedToken;
      next();
    });
  };
  



//Protect incoming requests
export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        res.status(401)
        res.json({message: "Not authorized"})
        return
    }

    //destructure the authorization token and split
    const [, token] = bearer.split(" ")

    if(!token) {
        res.status(401)
        res.json({message: "Invalid token"})
        return
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //augment the request object
        req.user = user
        next()
    } catch (error) {
        //console.error(error)
        res.status(403)
        res.json({message: "Invalid token"})
        return
    }

}