import { check } from "express-validator";


const schema = [
    check('org_name')
    .exists({checkFalsy: true}).withMessage('Organization Name is required')
    .isString(),

    check('logo_url')
    .exists({checkFalsy: true}).withMessage('Platform is required')
    .isString(),

    check('startDate')
    .exists({checkFalsy: true}).withMessage('Starting Date is required')
    .isDate({ format: 'YYYY-MM-DD'}).withMessage('Invalid Starting Date (YYYY-MM-DD)*'),

    check('endDate')
    .exists({checkFalsy: true}).withMessage('Ending Date is required')
    .isDate({ format: 'YYYY-MM-DD'}).withMessage('Invalid Ending Date  (YYYY-MM-DD)*'),
]

export {schema as organizationSchema}