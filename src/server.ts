import express from 'express'
import morgan from 'morgan'
import { protect } from './modules/auth'
import router from './routers/router'
import userRouter from './routers/userRoute'
import electionRouter from './routers/electionRoute'
import organizationRouter from './routers/organizationRoute'
import mobileverifyRoute from './routers/mobileverifyRoute'
const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200)
    res.json({message: "Welcome Home"})
})



app.use('/api', protect, router)

//election schema route
app.use('/election', protect, electionRouter)

//organization schema route
app.use('/organization', protect, organizationRouter)

//user schema route
app.use('/', userRouter)

//mobile verification schema route
app.use('/otp', mobileverifyRoute)

export default app