import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 6, max: 7}).withMessage('Invalid Student ID'),

    check('new_mobile_number')
    .exists({checkFalsy: true}).withMessage('Mobile Number is required')
    .isLength({min: 13,max: 13}).withMessage('Should be 11 digit number'),


]

export {schema as changeStudentMobileSchema}