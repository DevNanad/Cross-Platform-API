import { check } from "express-validator";


const schema = [
    check('mobile_number')
    .exists({checkFalsy: true}).withMessage('Mobile number is Required')
    .isLength({min: 11, max: 13}).withMessage('Invalid Mobile Number'),

    check('new_password')
    .exists({checkFalsy: true}).withMessage('New Password is required')
    .isLength({ min: 5 }).withMessage('Minimum of 5 characters'),
]

export {schema as forgotPasswordSchema}