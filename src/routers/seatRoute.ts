import {Router} from 'express'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectseatSchema } from '../validators/connectseatSchema'
import { createSeat, deleteASeat, disconnectSeatFromBallot, getAllSeat, orgBaseSeatID, seatToballot } from '../handlers/seatHandler'
import { seatSchema } from '../validators/seatSchema'
import { isAdmin } from '../modules/auth'

const router = Router()

//create single seat ⭐
router.post('/', isAdmin, seatSchema, validateRequestSchema, createSeat)

//get all seats ⭐
router.get('/', isAdmin, getAllSeat)

//delete a seat ⭐
router.delete('/:id', isAdmin, deleteASeat)

//connect seat to ballot ⭐
router.patch('/connect-seat-ballot', isAdmin, connectseatSchema, validateRequestSchema, seatToballot)

//disconnect seat from ballot ⭐
router.patch('/disconnect-seat-ballot', isAdmin, connectseatSchema, validateRequestSchema, disconnectSeatFromBallot)

//get candidates base on passed org id
router.get('/org-seat-candidates/:id', isAdmin, orgBaseSeatID)

export default router