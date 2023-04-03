import {Router} from 'express'
import { candidateToSeat, createCandidate, deleteACandidate, getACandidate, getAllCandidate, updateACandidate } from '../handlers/candidateHandler'
import { candidateSchema } from '../validators/candidateSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectcandidateSchema } from '../validators/connectcandidateSchema'

const router = Router()

//create a candidate
router.post('/create', candidateSchema, validateRequestSchema, createCandidate)

//get all candidates
router.get('/', getAllCandidate)

//get single candidate
router.get('/:id', getACandidate)

//delete single candidate
router.delete('/delete/:id', deleteACandidate)

//update single candidate
router.patch('/update/:id', candidateSchema, validateRequestSchema, updateACandidate)

router.patch('/connectcandidate',connectcandidateSchema, validateRequestSchema, candidateToSeat)
export default router