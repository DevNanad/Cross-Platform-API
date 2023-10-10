import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 6, max: 7}).withMessage('Invalid Student ID'),

    check('new_password')
    .exists({checkFalsy: true}).withMessage('New Password is required')
    .isLength({ min: 5 }).withMessage('Minimum of 5 characters'),
]

export {schema as changeStudentPasswordSchema}