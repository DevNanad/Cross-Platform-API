import {Router} from 'express'
import { sendOtp, verifyOtp } from '../handlers/mobileverifyHandler'
import { validateRequestSchema } from '../modules/validate-request-schema'
import { otpsendSchema } from '../validators/otpsendSchema'
import { otpverifySchema } from '../validators/otpverifySchema'

const router = Router()

//Send the Otp to client
router.post('/send', otpsendSchema, validateRequestSchema, sendOtp)

//Verify the from client
router.post('/verify', otpverifySchema, validateRequestSchema, verifyOtp)


export default router