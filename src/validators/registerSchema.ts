import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Must be 7 digit number')
    .isInt().withMessage('Invalid Student ID').toInt(),

    check('password')
    .isLength({ min: 5 })
]

export {schema as registerSchema}