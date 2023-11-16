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
import refreshRouter from './routers/refreshTokenRoute'
import logoutRouter from './routers/logoutRoute'
import { corsOptions } from './config/corsOptions'
import { credentials } from './modules/credentials'
const app = express()
import {Server} from 'socket.io'
import http from 'http'
import prisma from './db'

//middlewares
app.use(morgan('dev'))
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const server = http.createServer(app)

const io = new Server(server, {
    cors: corsOptions
})

io.on("connection", async (socket) => {
    try {
        const ongoing = await prisma.election.findMany({
            where: {
                status: 'ongoing'
            },
            include: { 
                organizations: {
                    include: {
                        ballots: true,
                        votes: true
                    }
                }
            }
        })
        socket.emit("elections",ongoing)
    } catch (error) {
        console.log(error.message)
    }

    socket.on("cast-vote", async (data) => {
        try {
            const positions = await prisma.seat.findMany({
                where: {
                    ballotId: data.ballot_id
                },
                include: {
                    candidates: true
                }
            });
            if (!positions) {
                throw new Error(`Positions not found for ballot ID ${data.ballot_id}`);
            }
            socket.broadcast.emit("single-org-result", positions)
        } catch (error) {
            console.log(error.message);
            
        }
        
    })

    socket.on("ballot-id",async (data) => {
        try {
            const positions = await prisma.seat.findMany({
                where: {
                    ballotId: data.ballot_id
                },
                include: {
                    candidates: true
                }
            });
            if (!positions) {
                throw new Error(`Positions not found for ballot ID ${data.ballot_id}`);
            }
            socket.emit("single-org-result", positions)
        } catch (error) {
            console.log(error.message);
            
        }
    })
    
})

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

export default server