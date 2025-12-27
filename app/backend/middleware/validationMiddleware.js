import { validationResult } from 'express-validator';
 

const validation = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      message: 'validation failed',
      error: error.array(),
    });
  }

  next();
};

export default validation;
