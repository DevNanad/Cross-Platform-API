import { check } from "express-validator";


const schema = [
    check('position')
    .exists({checkFalsy: true}).withMessage('Position is required')
]

export {schema as seatSchema}