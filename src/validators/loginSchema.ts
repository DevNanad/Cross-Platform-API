import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({max: 10})
    .isInt().withMessage('Incorrect Student ID or Password').toInt(),

    check('password')
    .isLength({ min: 5 })
]

export {schema as loginSchema}