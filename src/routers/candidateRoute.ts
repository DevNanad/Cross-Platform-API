import {Router} from 'express'
import { candidateToSeat, createCandidate } from '../handlers/candidateHandle'
import { candidateSchema } from '../validators/candidateSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'

const router = Router()

router.post('/create', candidateSchema, validateRequestSchema, createCandidate)

router.patch('/connectcandidate', candidateToSeat)
export default router