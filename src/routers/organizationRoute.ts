import {Router} from 'express'
import { createOrg } from '../handlers/organizationHandler'

const router = Router()

router.post('/create', createOrg)


export default router