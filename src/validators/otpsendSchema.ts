import { check } from "express-validator";


const schema = [
    check('mobile_number')
    .exists({checkFalsy: true}).withMessage('Mobile number is Required')
    .isLength({min: 11, max: 13}).withMessage('Invalid Mobile Number')
]

export {schema as otpsendSchema}