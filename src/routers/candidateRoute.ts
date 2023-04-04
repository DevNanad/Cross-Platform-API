import {Router} from 'express'
import { candidateToSeat, createCandidate, deleteACandidate, getACandidate, getAllCandidate, updateACandidate } from '../handlers/candidateHandler'
import { candidateSchema } from '../validators/candidateSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectcandidateSchema } from '../validators/connectcandidateSchema'

const router = Router()

//create a candidate
router.post('/', candidateSchema, validateRequestSchema, createCandidate)

//get all candidates
router.get('/', getAllCandidate)

//get single candidate
router.get('/:id', getACandidate)

//delete single candidate
router.delete('/:id', deleteACandidate)

//update single candidate
router.patch('/:id', candidateSchema, validateRequestSchema, updateACandidate)

//connect to seat
router.patch('/candidate-seat',connectcandidateSchema, validateRequestSchema, candidateToSeat)

export default router