import {Router} from 'express'
import { createOrg, createSeat, seatToballot } from '../handlers/organizationHandler'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { connectseatSchema } from '../validators/connectseatSchema'

const router = Router()

router.post('/create', createOrg)
router.post('/seat', createSeat)
router.patch('/connectseat', connectseatSchema, validateRequestSchema, seatToballot)

export default router