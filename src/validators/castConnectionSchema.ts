import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 6, max: 7}).withMessage('Invalid Student ID'),

    check('organization_id')
    .exists({checkFalsy: true}).withMessage('Organization ID is required'),
    
    check('vote')
    .exists({checkFalsy: true}).withMessage('Vote object is required')
    .isObject().withMessage("Must be an Object of Vote"),

]

export {schema as castConnectionSchema}