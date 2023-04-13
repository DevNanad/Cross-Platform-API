import {Router} from 'express'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectseatSchema } from '../validators/connectseatSchema'
import { createSeat, deleteASeat, getAllSeat, seatToballot } from '../handlers/seatHandler'
import { seatSchema } from '../validators/seatSchema'
import { isAdmin } from '../modules/auth'

const router = Router()

//create single seat ***
router.post('/', isAdmin, seatSchema, validateRequestSchema, createSeat)

//get all seats ***
router.get('/', isAdmin, getAllSeat)

//delete a seat ***
router.delete('/:id', isAdmin, deleteASeat)

//connect seat to ballot ***
router.patch('/seat-ballot', isAdmin, connectseatSchema, validateRequestSchema, seatToballot)

export default router