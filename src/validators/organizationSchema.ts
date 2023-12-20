import { check } from "express-validator";


const schema = [
    check('org_name')
    .exists({checkFalsy: true}).withMessage('Organization Name is required')
    .isString(),

    check('logo_url')
    .exists({checkFalsy: true}).withMessage('Logo Url is required')
    .isString(),
]

export {schema as organizationSchema}