import {Router} from 'express'
import { isAdmin } from '../modules/auth'
import { multipleId, singleId } from '../handlers/idHandler'
import { idSchema } from '../validators/idSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'

const router = Router()

//upload single id
router.post('/', idSchema, validateRequestSchema, isAdmin, singleId)

//upload multiple ids
router.post('/multiple', multipleId)

export default router