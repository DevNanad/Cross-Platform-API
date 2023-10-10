import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 6, max: 7}).withMessage('Invalid Student ID'),

    check('new_pin_number')
    .exists({checkFalsy: true}).withMessage('New PIN is required')
    .isLength({min: 4,max: 4}).withMessage('Should be 4 digit number')
]

export {schema as changStudentPinSchema}