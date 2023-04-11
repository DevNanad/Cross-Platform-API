import { check } from "express-validator";


const schema = [
    check('username')
    .exists({checkFalsy: true}).withMessage('Username is required')
    .isString()
    .isLength({ min: 5 }).withMessage('Minimum of 5 characters'),

    check('password')
    .exists({checkFalsy: true}).withMessage('Password is required')
    .isString()
    .isLength({ min: 5 }).withMessage('Minimum of 5 characters')
]

export {schema as adminLoginRegisterSchema}