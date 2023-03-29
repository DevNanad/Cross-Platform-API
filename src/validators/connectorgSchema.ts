import { check } from "express-validator";


const schema = [
    check('election_id')
    .exists({checkFalsy: true}).withMessage('Election is required')
    .isString()
    .isLength({min: 5,}).withMessage('Invalid Election'),

    check('org_id')
    .exists({checkFalsy: true}).withMessage('Organizatoin is required')
    .isString()
    .isLength({min: 5,}).withMessage('Invalid Organization')
]

export {schema as connectorgSchema}