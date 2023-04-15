import {Router} from 'express'
import { isAdmin } from '../modules/auth'
import { singleId } from '../handlers/idHandler'

const router = Router()

//upload single id
router.post('/', isAdmin, singleId)

export default router