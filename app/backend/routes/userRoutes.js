import express from 'express';
import {
  userLogout,
  userProfile,
  userRegister,
  userSetAuth,
  userUpdate,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  rulesForRegister,
  rulesForAuth,
  rulesForUpdate,
} from '../utils/rules.js';
import validation from '../middleware/validationMiddleware.js';

const router = express.Router();
router.post(
  '/',
  rulesForRegister(),
  validation,
  userRegister
);
router.post(
  '/auth',
  rulesForAuth(),
  validation,
  userSetAuth
);
router.post('/logout', userLogout);
router
  .route('/profile')
  .put(
    protect,
    rulesForUpdate(),
    validation,
    userUpdate
  )
  .get(protect, userProfile);

export default router;
