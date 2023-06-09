const { body } = require('express-validator');

const schema = [
  body('column')
    .optional()
    .isString()
    .withMessage('Column should be a string'),

  body('sheet')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sheet should be a non-negative integer'),
];

export {schema as idXlsxSchema}
