import {Router} from 'express'
import { createCandidate } from '../handlers/candidateHandle'

const router = Router()

router.post('/create', createCandidate)

export default router