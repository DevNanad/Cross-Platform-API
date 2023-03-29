import { check } from "express-validator";


const schema = [
    check('title')
    .exists({checkFalsy: true}).withMessage('Title is required')
    .isString()
    .isLength({min: 5,}).withMessage('Invalid Title'),

    check('startDate')
    .exists({checkFalsy: true}).withMessage('Starting Date is required')
    .isDate({ format: 'YYYY-MM-DD'}).withMessage('Invalid Starting Date (YYYY-MM-DD)*'),

    check('endDate')
    .exists({checkFalsy: true}).withMessage('Ending Date is required')
    .isDate({ format: 'YYYY-MM-DD'}).withMessage('Invalid Ending Date  (YYYY-MM-DD)*'),
]

export {schema as electionSchema}