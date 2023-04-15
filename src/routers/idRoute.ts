import {Router} from 'express'
import { isAdmin } from '../modules/auth'
import { singleId } from '../handlers/idHandler'
import { idSchema } from '../validators/idSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'

const router = Router()

//upload single id
router.post('/', idSchema, validateRequestSchema, isAdmin, singleId)

export default router