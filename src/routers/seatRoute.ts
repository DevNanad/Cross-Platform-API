import {Router} from 'express'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectseatSchema } from '../validators/connectseatSchema'
import { ballotBaseSeatID, createSeat, deleteASeat, disconnectSeatFromBallot, getAllNullSeat, getAllSeat, orgBaseSeatID, seatToballot, updateAPosition } from '../handlers/seatHandler'
import { seatSchema } from '../validators/seatSchema'
import { isAdmin, protect } from '../modules/auth'

const router = Router()

//create single seat ⭐
router.post('/', isAdmin, seatSchema, validateRequestSchema, createSeat)

//get all seats ⭐
router.get('/', isAdmin, getAllSeat)

//get all disconnected seats ⭐
router.get('/null', isAdmin, getAllNullSeat)

//delete a seat ⭐
router.delete('/:id', isAdmin, deleteASeat)

//update single Position ⭐
router.patch("/update/:id", isAdmin, updateAPosition);

//connect seat to ballot ⭐
router.patch('/connect-seat-ballot', isAdmin, connectseatSchema, validateRequestSchema, seatToballot)

//disconnect seat from ballot ⭐
router.patch('/disconnect-seat-ballot', isAdmin, connectseatSchema, validateRequestSchema, disconnectSeatFromBallot)

//get candidates base on passed org id ⭐
router.get('/org-seat-candidates/:id', isAdmin, orgBaseSeatID)

//get all positions base on passed ballot id
router.get('/get-all-positions/:id', protect, ballotBaseSeatID)

export default router