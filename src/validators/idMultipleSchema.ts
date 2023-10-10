import { body } from "express-validator";


const schema = [
    body('student_ids')
    .notEmpty().withMessage('Student IDs are required')
    .matches(/^\d{7}(,\d{7})*$/).withMessage('Student IDs should be comma-separated 6 or 7 digit numbers'),

    body('student_ids.*')
    .isLength({ min: 6, max: 7 }).withMessage('Each student ID should be 6 or 7 digits')
]

export {schema as idMultipleSchema}