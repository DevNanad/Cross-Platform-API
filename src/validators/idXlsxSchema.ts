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

  body('file')
    .notEmpty()
    .withMessage('File is required')
    .custom((value, { req }) => {
      if (req.file.size > 2 * 1024 * 1024) {
        throw new Error('File should be less than 2MB');
      }
      return true;
    })
];

export {schema as idXlsxSchema}
