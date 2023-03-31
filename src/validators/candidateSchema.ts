import { check } from "express-validator";


const schema = [
    check('fullname')
    .exists({checkFalsy: true}).withMessage('Fullname is required')
    .isString()
    .isLength({min: 5,}).withMessage('Fullname too short'),

    check('platform')
    .exists({checkFalsy: true}).withMessage('Platform is required')
    .isString()
    .isLength({min: 5,}).withMessage('Platform too short'),

    check('party')
    .exists({checkFalsy: true}).withMessage('Party is required')
    .isString(),

    check('imageUrl')
    .isString().optional({nullable: true})
]

export {schema as candidateSchema}