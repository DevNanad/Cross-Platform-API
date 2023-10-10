import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 6, max: 7}).withMessage('Invalid Student ID'),

    check('new_mobile_number')
    .exists({checkFalsy: true}).withMessage('Mobile Number is required')
    .isLength({min: 13,max: 13}).withMessage('Should be 13 digit number'),

    check('new_otp_code')
    .exists({checkFalsy: true}).withMessage('OTP Code is Required')
    .isLength({min: 6, max: 6}).withMessage('Invalid OTP')


]

export {schema as confirmStudentMobileSchema}