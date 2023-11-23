import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 6, max: 7}).withMessage('Invalid Student ID'),

    check('new_password')
    .exists({checkFalsy: true}).withMessage('Password is required')
    .isLength({ min: 5 }).withMessage('Minimum of 5 characters'),

    check('pin_code')
    .exists({checkFalsy: true}).withMessage('PIN is required')
    .isLength({min: 4,max: 4}).withMessage('Should be 4 digit number'),

    check('email')
    .exists({checkFalsy: true}).withMessage('Email Address is required')
    .isEmail().withMessage('Email is not Valid'),
]

export {schema as recoverAccountSchema}