import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

//Create JWT token of the user
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  )

  return token
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
        const user = jwt.verify(token, process.env.JWT_SECRET)
        //augment the request object
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.status(401)
        res.json({message: "Invalid token"})
        return
    }

}