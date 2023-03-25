import express from 'express'
import morgan from 'morgan'
import { createUser, loginUser } from './handlers/user'
import { protect } from './modules/auth'
import router from './router'
import { body, validationResult } from "express-validator";
const app = express()


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200)
    res.json({message: "Welcome Home"})
})

app.use('/api', protect, router)
app.post('/user', createUser)
app.post('/login', loginUser)

export default app