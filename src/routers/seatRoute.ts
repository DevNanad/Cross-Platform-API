import {Router} from 'express'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectseatSchema } from '../validators/connectseatSchema'
import { createSeat, seatToballot } from '../handlers/seatHandler'

const router = Router()

router.post('/create', createSeat)
router.patch('/connectseat', connectseatSchema, validateRequestSchema, seatToballot)

export default router