import express from 'express'
import morgan from 'morgan'
import { protect } from './modules/auth'
import router from './routers/router'
import userRouter from './routers/userRoute'
import electionRouter from './routers/electionRoute'
import mobileverifyRoute from './routers/mobileverifyRoute'
const app = express()


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200)
    res.json({message: "Welcome Home"})
})

app.use('/api', protect, router)
app.use('/election', protect, electionRouter)
app.use('/', userRouter)
app.use('/otp', mobileverifyRoute)

export default app