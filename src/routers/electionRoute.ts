import {Router} from 'express'
import { createElection, connectOrg, getAllElection, deleteAnElection, deleteAllElection } from '../handlers/electionHandler'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectorgSchema } from '../validators/connectorgSchema'
import { electionSchema } from '../validators/electionSchema'

const router = Router()

//create an election
router.post('/create', electionSchema, validateRequestSchema, createElection)

//connect org to election
router.patch('/connectorg', connectorgSchema,validateRequestSchema, connectOrg)

//get all elections
router.get('/', getAllElection)

//delete single election
router.delete('/delete/:id', deleteAnElection)

//delete all election
router.delete('/delete', deleteAllElection)

export default router