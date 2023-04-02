import {Router} from 'express'
import { createOrg, deleteAllOrg, deleteAnOrg, getAllOrg, getAnOrg } from '../handlers/organizationHandler'

const router = Router()

//create an organization
router.post('/create', createOrg)

//get all organizations
router.get('/', getAllOrg)

//get single organization
router.get('/:id', getAnOrg)

//delete all organizations
router.delete('/delete', deleteAllOrg)

//delete single organization
router.delete('/delete/:id', deleteAnOrg)


export default router