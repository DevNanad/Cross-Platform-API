import { check } from "express-validator";


const schema = [
    check('ballot_id')
    .exists({checkFalsy: true}).withMessage('Ballot is required')
    .isString()
    .isLength({min: 5,}).withMessage('Invalid Ballot'),

    check('seat_id')
    .exists({checkFalsy: true}).withMessage('Seat is required')
    .isString()
    .isLength({min: 5,}).withMessage('Invalid Seat')
]

export {schema as connectseatSchema}