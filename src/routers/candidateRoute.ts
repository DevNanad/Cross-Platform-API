import {Router} from 'express'
import { candidateToSeat, createCandidate, getAllCandidate } from '../handlers/candidateHandler'
import { candidateSchema } from '../validators/candidateSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectcandidateSchema } from '../validators/connectcandidateSchema'

const router = Router()

//create a candidate
router.post('/create', candidateSchema, validateRequestSchema, createCandidate)

//get all candidates
router.get('/', getAllCandidate)

router.patch('/connectcandidate',connectcandidateSchema, validateRequestSchema, candidateToSeat)
export default router