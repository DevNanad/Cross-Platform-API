import {Router} from 'express'
import { candidateToSeat, createCandidate, deleteACandidate, getACandidate, getAllCandidate, updateACandidate } from '../handlers/candidateHandler'
import { candidateSchema } from '../validators/candidateSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectcandidateSchema } from '../validators/connectcandidateSchema'
import { isAdmin } from '../modules/auth'

const router = Router()

//create a candidate ***
router.post('/', isAdmin, candidateSchema, validateRequestSchema, createCandidate)

//get all candidates ***
router.get('/', isAdmin, getAllCandidate)

//get single candidate ***
router.get('/:id', isAdmin, getACandidate)

//delete single candidate ***
router.delete('/:id', isAdmin, deleteACandidate)

//update single candidate ***
router.patch('/:id', isAdmin, candidateSchema, validateRequestSchema, updateACandidate)

//connect to seat ***
router.patch('/candidate-seat', isAdmin,connectcandidateSchema, validateRequestSchema, candidateToSeat)

export default router