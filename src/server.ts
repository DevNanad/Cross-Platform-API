import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { protect } from './modules/auth'
import userRouter from './routers/userRoute'
import electionRouter from './routers/electionRoute'
import organizationRouter from './routers/organizationRoute'
import seatRouter from './routers/seatRoute'
import candidateRouter from './routers/candidateRoute'
import mobileverifyRoute from './routers/mobileverifyRoute'
import idRouter from './routers/idRoute'
import refreshRouter from './routers/refreshTokenRoute'
import logoutRouter from './routers/logoutRoute'
import { corsOptions } from './config/corsOptions'
import { credentials } from './modules/credentials'
const app = express()

//middlewares
app.use(morgan('dev'))
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//Home page
app.get('/', (req, res) => {
    res.status(200)
    res.json({message: "Welcome Home"})
})

//refreshtoken route
app.use('/refresh', refreshRouter)
app.use('/logout', logoutRouter)

//election schema route
app.use('/election', protect, electionRouter)

//organization schema route
app.use('/organization', protect, organizationRouter)

//seat schema route
app.use('/seat', protect, seatRouter)

//candidate schema route
app.use('/candidate', protect, candidateRouter)

//user schema route
app.use('/', userRouter)

//id schema route
app.use('/id', idRouter)

//mobile verification schema route
app.use('/otp', mobileverifyRoute)

export default app