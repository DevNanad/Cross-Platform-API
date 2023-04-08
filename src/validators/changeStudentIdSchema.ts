import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Invalid Student ID'),

    check('new_student_id')
    .exists({checkFalsy: true}).withMessage('New Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Invalid New Student ID'),

    

]

export {schema as changeStudentIdSchema}