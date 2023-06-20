import { check } from "express-validator";

const schema = [
    check('student_id')
    .exists({checkFalsy: true}).withMessage('Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Invalid Student ID'),

    check('new_student_id')
    .exists({checkFalsy: true}).withMessage('New Student ID is required')
    .isLength({min: 7, max: 7}).withMessage('Invalid New Student ID'),

    check('firstname')
    .exists({checkFalsy: true}).withMessage('Firstname is required')
    .isString().withMessage("Should be a String"),

    check('surname')
    .exists({checkFalsy: true}).withMessage('Surname is required')
    .isString().withMessage("Should be a String"),

    check('age')
    .exists({checkFalsy: true}).withMessage('Age is required')
    .isLength({min: 1, max: 2}).withMessage('Invalid Age'),

    check('year_level')
    .exists({ checkFalsy: true }).withMessage('Year Level is required')
    .isIn(['1st Year', '2nd Year', '3rd Year', '4th Year',]).withMessage('Invalid Year Level. Valid values are "1st Year", "1st Year", "2nd Year" "3rd Year", or "4th Year".'),

];

export {schema as updateAdminProfileSchema}