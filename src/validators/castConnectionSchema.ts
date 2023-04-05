import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Invalid Student ID'),

    check('organization_id')
    .exists({checkFalsy: true}).withMessage('Organization ID is required'),
    
    check('candidate_id')
    .exists({checkFalsy: true}).withMessage('Candidate ID is required'),

]

export {schema as castConnectionSchema}