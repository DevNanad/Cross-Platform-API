const { body } = require('express-validator');

const schema = [
  body('column')
  .optional()
  .isString()
  .withMessage('Column should be a string')
  .matches(/^[A-Za-z]+$/, 'i')
  .withMessage('Column should only contain letters'),

  body('sheet')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sheet should be a non-negative integer')
    .matches(/^\d{1,7}$/, 'i')
    .withMessage('Sheet should be a 1 to 7 digit integer'),
];

export {schema as idXlsxSchema}
