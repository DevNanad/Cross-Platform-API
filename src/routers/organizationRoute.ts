import {Router} from 'express'
import { createOrg, deleteAllOrg, getAllOrg, getAnOrg } from '../handlers/organizationHandler'

const router = Router()

//create an organization
router.post('/create', createOrg)

//get all organizations
router.get('/', getAllOrg)

//get single organization
router.get('/:id', getAnOrg)

//delete all organizations
router.delete('/delete', deleteAllOrg)


export default router