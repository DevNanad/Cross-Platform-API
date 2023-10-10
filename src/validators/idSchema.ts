import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 6, max: 7}).withMessage('Invalid Student ID')
]

export {schema as idSchema}