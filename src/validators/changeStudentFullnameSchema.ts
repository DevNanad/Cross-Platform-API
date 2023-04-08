import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Invalid Student ID'),

    check('new_fullname')
    .exists({checkFalsy: true}).withMessage('New Fullname is required')
    .isString().withMessage("Should be a String")

]

export {schema as changeStudentFullnameSchema}