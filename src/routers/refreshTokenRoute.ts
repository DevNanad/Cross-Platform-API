import {Router} from 'express'
import { handleRefreshToken } from '../handlers/refreshTokenHandler'

const router = Router()

router.get('/', handleRefreshToken)

export default router