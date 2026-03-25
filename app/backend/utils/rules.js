import { body, param } from 'express-validator';
import User from '../model/userModel.js';
// user
const rulesForRegister = () => [
  body('name')
    .notEmpty()
    .withMessage('user name is required')
    .matches(/^[a-zA-Z_]+$/)
    .withMessage(
      'Name can only contain letters , Use "_" for spaces'
    )
    .isLength({ min: 3 })
    .withMessage('user name is too short')
    .toLowerCase()
    .trim(),

  body('password')
    .isLength({ min: 5 })
    .withMessage(
      'password must have at least 5 characters long'
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain numbers and letters'
    ),
  body('email')
    .isEmail()
    .withMessage('Please enter valid email')
    .normalizeEmail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(
        (existUser) => {
          if (existUser) {
            return Promise.reject(
              'Your email is already exist. Please enter different email'
            );
          }
        }
      );
    }),
];

const rulesForAuth = () => [
  body('email')
    .isEmail()
    .withMessage('Please enter valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 5 })
    .withMessage(
      'password must have at least 5 characters long'
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain numbers and letters'
    ),
];

const rulesForUpdate = () => [
  body('name')
    .optional()
    .matches(/^[a-zA-Z_]+$/)
    .withMessage(
      'Name can only contain letters , Use "_" for spaces'
    )
    .isLength({ min: 3 })
    .withMessage('user name is too short')
    .toLowerCase()
    .trim(),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please enter valid email')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 5 })
    .withMessage(
      'password must have at least 5 characters long'
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain numbers and letters'
    ),
];

export {
  rulesForRegister,
  rulesForAuth,
  rulesForUpdate,
};
const colorTypes = [
  'blue',
  'green',
  'purple',
  'red',
  'yellow',
]
// List rules
const rulesForCreateList = () => [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Add list name'),
  body('description').optional().trim(),
  body('color')
    .trim()
    .toLowerCase()
    .isIn(colorTypes)
    .withMessage('Invalid color value'),
];

const rulesForUpdateList = () => [
  param('id')
    .notEmpty()
    .isMongoId()
    .withMessage('Not valid Id'),
  body('name').optional().trim(),
  body('description').optional().trim(),
    body('color')
    .trim()
    .toLowerCase()
    .isIn(colorTypes)
    .withMessage('Invalid color value'),
];

const rulesForDeleteList = () => [
  param('id')
    .notEmpty()
    .isMongoId()
    .withMessage('Not valid Id'),
];
const rulesForReadList = () => [
  param('id')
    .notEmpty()
    .isMongoId()
    .withMessage('Not valid Id'),
];
export {
  rulesForCreateList,
  rulesForUpdateList,
  rulesForReadList,
  rulesForDeleteList,
};

// Items
// itemControllerWithListParam.js
// limited quantity types for now
const quantityTypes = [
  'kg',
  'g',
  'liter',
  'ml',
  'packet',
];
const rulesForListParam = () => [
  param('listId')
    .notEmpty()
    .isMongoId()
    .withMessage('Not valid Id'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Add item name'),
  body('category').optional().trim(),
  body('quantity')
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('Add numeric values'),
  body('quantityType')
    .trim()
    .notEmpty()
    .isString()
    .isIn(quantityTypes)
    .withMessage('Not a valid quantity type'),
  body('description').optional().trim(),
  body('price')
    .optional()
    .trim()
    .isNumeric()
    .isFloat({
      min: 0,
      exclusive: true,
    })
    .withMessage('Add numeric values'),
  body('location').optional().trim(),
  body('dop').optional().trim().isDate(),
];

const rulesForGetItem = () => [
  param('itemId')
    .notEmpty()
    .isMongoId()
    .withMessage('Not valid Id'),
];

const rulesForUpdateItem = () => [
  param('itemId')
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage('Not valid Id'),
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Add item name'),
  body('category').optional().trim(),
  body('quantity')
    .optional()
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('Add numeric values'),
  body('quantityType')
    .optional()
    .trim()
    .notEmpty()
    .isString()
    .isIn(quantityTypes)
    .withMessage('Not a valid quantity type'),
  body('description').optional().trim(),
  body('price')
    .optional()
    .trim()
    .isNumeric()
    .isFloat({
      min: 0,
      exclusive: true,
    })
    .withMessage('Add numeric values'),
  body('location').optional().trim(),
  body('dop').optional().trim().isDate(),
];

const rulesForGetAllItem = () => [
  param('listId')
    .notEmpty()
    .isMongoId()
    .withMessage('Not valid Id'),
];
const rulesForDeleteItem = () => [
  param('itemId')
    .notEmpty()
    .isMongoId()
    .withMessage('Not valid Id'),
];
export {
  rulesForListParam,
  rulesForGetItem,
  rulesForUpdateItem,
  rulesForGetAllItem,
  rulesForDeleteItem,
};
