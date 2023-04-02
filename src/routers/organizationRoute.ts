import {Router} from 'express'
import { createOrg, getAllOrg } from '../handlers/organizationHandler'

const router = Router()

//create an organization
router.post('/create', createOrg)

//get all organizations
router.get('/', getAllOrg)


export default router