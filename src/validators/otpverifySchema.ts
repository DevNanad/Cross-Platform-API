import { check } from "express-validator";


const schema = [
    check('mobile_number')
    .exists({checkFalsy: true}).withMessage('Mobile number is Required')
    .isLength({min: 11, max: 13}).withMessage('Invalid Mobile Number'),

    check('otp_code')
    .exists({checkFalsy: true}).withMessage('OTP Code is Required')
    .isLength({min: 6, max: 6}).withMessage('Invalid OTP')
]

export {schema as otpverifySchema}