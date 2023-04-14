import { check } from "express-validator";


const schema = [
    check('mobile_number')
    .exists({checkFalsy: true}).withMessage('Mobile number is Required')
    .isLength({min: 11, max: 13}).withMessage('Invalid Mobile Number'),

    check('new_pin_number')
    .exists({checkFalsy: true}).withMessage('New PIN is required')
    .isLength({min: 4,max: 4}).withMessage('Should be 4 digit number'),

]

export {schema as forgotPinSchema}