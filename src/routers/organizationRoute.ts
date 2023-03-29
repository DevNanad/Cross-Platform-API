import {Router} from 'express'
import { createOrg, createSeat } from '../handlers/organizationHandler'

const router = Router()

router.post('/create', createOrg)
router.post('/seat', createSeat)

export default router