import {Router} from 'express'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectseatSchema } from '../validators/connectseatSchema'
import { createSeat, getAllSeat, seatToballot } from '../handlers/seatHandler'

const router = Router()

//create single seat
router.post('/create', createSeat)

//get all seats
router.get('/', getAllSeat)

//connect seat to ballot
router.patch('/connectseat', connectseatSchema, validateRequestSchema, seatToballot)

export default router