import { check } from "express-validator";


const schema = [
    check('email')
    .exists({checkFalsy: true}).withMessage('Email is Required'),

    check('new_password')
    .exists({checkFalsy: true}).withMessage('New Password is required')
    .isLength({ min: 5 }).withMessage('Minimum of 5 characters'),
]

export {schema as forgotPasswordSchema}