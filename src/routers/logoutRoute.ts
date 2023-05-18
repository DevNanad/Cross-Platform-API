import {Router} from 'express'
import { handleLogout } from '../handlers/logoutHandler'

const router = Router()

router.post('/', handleLogout)

export default router