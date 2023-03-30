import {Router} from 'express'
import { createOrg, createSeat, seatToballot } from '../handlers/organizationHandler'

const router = Router()

router.post('/create', createOrg)
router.post('/seat', createSeat)
router.patch('/connectseat', seatToballot)

export default router