import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { generateAdmin, protect } from './modules/auth'
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

app.use(generateAdmin)

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
    
    socket.on("admin-emit",async (data) => {
        
        //ALL VOTERS
        try {
            const allVoters = await prisma.user.findMany();
            socket.emit("all-voters", allVoters)
        } catch (error) {
            console.log(error.message)
        }
        //VOTED ACTIVITIES
        try {
            const [count, activities] = await Promise.all([
                prisma.activity.groupBy({
                    by: ['userId'],
                    where: { type: 'voted' }}),
                prisma.activity.findMany({
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                    where: { type: 'voted' },
                    include: {
                    user: {
                        select: {
                        profile_picture: true,
                        firstname: true,
                        surname: true
                        },
                    },
                    },
                }),
            ])
            if(activities.length === 0) {
              throw new Error("No Activity");
            }
            socket.emit("activities", {count, activities})
        } catch (error) {
            console.log(error.message);
        }
        //ALL ELECTION
        try {
            const allElections = await prisma.election.findMany({
                include: { 
                    organizations: {
                        include: {
                            ballots: true,
                            votes: true
                        }
                    }
                }
            })
            socket.emit("all-elections", allElections)
        } catch (error) {
            console.log(error.message);
        }
        
        //ALL ORGANIZATIONS
        try {
            const allOrganizations = await prisma.organization.findMany();
            socket.emit("all-organizations", allOrganizations)
        } catch (error) {
            console.log(error.message);
        }

    })

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

        //VOTED ACTIVITIES
        try {
            const [count, activities] = await Promise.all([
                prisma.activity.groupBy({
                    by: ['userId'],
                    where: { type: 'voted' }}),
                prisma.activity.findMany({
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                    where: { type: 'voted' },
                    include: {
                    user: {
                        select: {
                        profile_picture: true,
                        firstname: true,
                        surname: true
                        },
                    },
                    },
                }),
            ])
            if(activities.length === 0) {
              throw new Error("No Activity");
            }
            socket.broadcast.emit("activities", {count, activities})
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