import {Router} from 'express'
import { isAdmin } from '../modules/auth'
import { multipleId, singleId, xlsxUploadIds } from '../handlers/idHandler'
import { idSchema } from '../validators/idSchema'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { idMultipleSchema } from '../validators/idMultipleSchema'
import { upload } from '../modules/upload'
import { idXlsxSchema } from '../validators/idXlsxSchema'

const router = Router()

//upload single id
router.post('/', isAdmin,idSchema, validateRequestSchema, singleId)

//upload multiple ids
router.post('/multiple',isAdmin, idMultipleSchema, validateRequestSchema, multipleId)

//upload xlsx file ids
router.post('/xlsx', isAdmin, idXlsxSchema, validateRequestSchema, upload.single('file'), xlsxUploadIds)

export default router