import {Router} from 'express'
import { isAdmin } from '../modules/auth'
import { multipleId, singleId } from '../handlers/idHandler'
import { idSchema } from '../validators/idSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { idMultipleSchema } from '../validators/idMultipleSchema'

const router = Router()

//upload single id
router.post('/', isAdmin,idSchema, validateRequestSchema, singleId)

//upload multiple ids
router.post('/multiple',isAdmin, idMultipleSchema, validateRequestSchema, multipleId)

export default router