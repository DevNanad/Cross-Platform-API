import {Router} from 'express'
import { createElection, connectOrg, getAllElection, deleteAnElection, deleteAllElection, getAnElection } from '../handlers/electionHandler'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectorgSchema } from '../validators/connectorgSchema'
import { electionSchema } from '../validators/electionSchema'

const router = Router()

//create an election
router.post('/', electionSchema, validateRequestSchema, createElection)

//connect org to election
router.patch('/org-election', connectorgSchema,validateRequestSchema, connectOrg)

//get single election
router.get('/:id', getAnElection)

//get all elections
router.get('/', getAllElection)

//delete single election
router.delete('/:id', deleteAnElection)

//delete all election
router.delete('/', deleteAllElection)

export default router