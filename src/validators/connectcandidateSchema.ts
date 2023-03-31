import { check } from "express-validator";


const schema = [
    check('seat_id')
    .exists({checkFalsy: true}).withMessage('Seat is required')
    .isString()
    .isLength({min: 5,}).withMessage('Invalid Seat'),

    check('candidate_id')
    .exists({checkFalsy: true}).withMessage('Candidate is required')
    .isString()
    .isLength({min: 5,}).withMessage('Invalid Candidate')
]

export {schema as connectcandidateSchema}