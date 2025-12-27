import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

const protect = asyncHandler(
  async (req, res, next) => {
    let token;
    token = req.signedCookies.jwt;
    if (token) {
      try {
        const decode = jwt.verify(
          token,
          process.env.SECRET_KEY
        );

        req.user = await User.findOne({
          _id: decode.userId,
        }).select('-password');

        next();
      } catch (error) {
        res.status(401);
        throw new Error(error);
      }
    } else {
      res.status(401);
      throw new Error(
        'Not authorize. Sign in again'
      );
    }
  }
);

export { protect };
