import { check } from "express-validator";


const schema = [
    check('title')
    .exists({checkFalsy: true}).withMessage('Title is required')
    .isString()
    .isLength({min: 5,}).withMessage('Invalid Title'),

    check('startDate')
    .exists({ checkFalsy: true }).withMessage('Starting Date is required')
    .isISO8601().withMessage('Invalid Starting Date (ISO8601 format)'),

    check('endDate')
    .exists({ checkFalsy: true }).withMessage('Ending Date is required')
    .isISO8601().withMessage('Invalid Ending Date (ISO8601 format)'),
]

export {schema as electionSchema}