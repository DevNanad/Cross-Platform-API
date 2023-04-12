import { check } from "express-validator";


const schema = [
    check('id')
    .exists({checkFalsy: true}).withMessage('Admin ID is required')
    .isString(),

    check('username')
    .exists({checkFalsy: true}).withMessage('Username is required')
    .isString()
    .isLength({ min: 5 }).withMessage('Minimum of 5 characters')
]

export {schema as adminUpdateUsernameSchema}