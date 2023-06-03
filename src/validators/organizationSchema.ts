import { check } from "express-validator";


const schema = [
    check('org_name')
    .exists({checkFalsy: true}).withMessage('Organization Name is required')
    .isString(),

    check('logo_url')
    .exists({checkFalsy: true}).withMessage('Logo Url is required')
    .isString(),

    check('start_date')
    .exists({checkFalsy: true}).withMessage('Starting Date is required')
    .isDate({ format: 'YYYY-MM-DD'}).withMessage('Invalid Starting Date (YYYY-MM-DD)*'),

    check('end_date')
    .exists({checkFalsy: true}).withMessage('Ending Date is required')
    .isDate({ format: 'YYYY-MM-DD'}).withMessage('Invalid Ending Date  (YYYY-MM-DD)*'),
]

export {schema as organizationSchema}