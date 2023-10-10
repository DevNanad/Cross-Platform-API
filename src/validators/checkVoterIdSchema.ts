import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isString()
    .isLength({min: 6, max: 7}).withMessage('Should be 7 characters')
]

export {schema as checkVoterIdSchema}