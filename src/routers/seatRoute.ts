import {Router} from 'express'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectseatSchema } from '../validators/connectseatSchema'
import { createSeat, deleteASeat, getAllSeat, seatToballot } from '../handlers/seatHandler'
import { seatSchema } from '../validators/seatSchema'

const router = Router()

//create single seat
router.post('/', seatSchema, validateRequestSchema, createSeat)

//get all seats
router.get('/', getAllSeat)

//delete a seat
router.delete('/:id', deleteASeat)

//connect seat to ballot
router.patch('/seat-ballot', connectseatSchema, validateRequestSchema, seatToballot)

export default router