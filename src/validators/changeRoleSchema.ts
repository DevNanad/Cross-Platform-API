import { check } from "express-validator";

const schema = [
  check('student_id')
    .exists({ checkFalsy: true }).withMessage('Student ID is required')
    .isLength({ min: 6, max: 7 }).withMessage('Invalid Student ID'),

  check('new_role')
    .exists({ checkFalsy: true }).withMessage('New Role is required')
    .isIn(['admin', 'user']).withMessage('Invalid New Role. Valid values are "admin" or "user".'),

];

export { schema as changeRoleSchema };
