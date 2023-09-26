import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Invalid Student ID'),

    check('password')
    .exists({checkFalsy: true}).withMessage('Password is required')
    .isLength({ min: 4 }).withMessage('Minimum of 4 characters')
]

export {schema as loginSchema}