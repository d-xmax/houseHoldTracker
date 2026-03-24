import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc register new user
// @path POST /api/users/
// @access Public

const userRegister = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({
      email,
    });
    if (userExist) {
      res.status(400);
      throw new Error('user already exists');
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });
      res.status(200).json({
        message: 'User register successful',
      });
    }
  },
);

// @desc authenticate user
// @path POST /api/users/auth
// @access Public

const userSetAuth = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await user.matchPassword(password))
    ) {
      const token = generateToken(user._id);
      res.status(200).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        message: 'User authenticated',
      });
    } else {
      res.status(400);
      throw new Error('Invalid user details');
    }
  },
);

// @desc logout user
// @path POST /api/users/logout
// @access Public

const userLogout = asyncHandler(
  async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({
      message: 'cookie cleared',
    });
  },
);

// @desc update user info
// @path PUT /api/users/profile
// @access Public

const userUpdate = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findById(
      req.user._id,
    );
    if (user) {
      user.email = email || user.email;
      user.name = name || user.name;

      if (password) {
        user.password = password;
      }

      const updatedProfile = await user.save();

      res.status(200).json({
        name: updatedProfile.name,
        email: updatedProfile.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  },
);

// @desc get user info
// @path GET /api/users/profile
// @access Private

const userProfile = asyncHandler(
  async (req, res) => {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };

    res.status(200).json(user);
  },
);

export {
  userRegister,
  userSetAuth,
  userLogout,
  userUpdate,
  userProfile,
};
