import express from 'express'
import morgan from 'morgan'
import { protect } from './modules/auth'
import userRouter from './routers/userRoute'
import electionRouter from './routers/electionRoute'
import organizationRouter from './routers/organizationRoute'
import seatRouter from './routers/seatRoute'
import candidateRouter from './routers/candidateRoute'
import mobileverifyRoute from './routers/mobileverifyRoute'
const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Home page
app.get('/', (req, res) => {
    res.status(200)
    res.json({message: "Welcome Home"})
})

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

//mobile verification schema route
app.use('/otp', mobileverifyRoute)

export default app