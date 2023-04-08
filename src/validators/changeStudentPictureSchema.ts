import { check } from "express-validator";


const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Invalid Student ID'),

    check('new_profile_picture')
    .exists({checkFalsy: true}).withMessage('New Picture URL is required')
    .isString().withMessage("Should be a valid Picture URL")

]

export {schema as changeStudentPictureSchema}