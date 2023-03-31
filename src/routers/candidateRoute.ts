import {Router} from 'express'
import { candidateToSeat, createCandidate } from '../handlers/candidateHandle'

const router = Router()

router.post('/create', createCandidate)

router.patch('/connectcandidate', candidateToSeat)
export default router