import { Router } from 'express';
import User from '../middleware/user';
import Validations from '../middleware/validations';
import TokenHandler from '../middleware/tokenHandler';
import AuthController from '../controllers/authController';
import PasswordController from '../controllers/passwordController';

const router = Router();

router.get('/verify/:token', AuthController.verifyEmail);
router.post('/signin', Validations.validateSignInData, AuthController.signIn);
router.post('/reset-link', Validations.validateEmail, PasswordController.sendPasswordResetLink);
router.post('/signup', Validations.validateSignUpData, User.verifyUsedEmail, User.verifyUsedUsername, AuthController.signUp);
router.post('/update-password/:email/:token', Validations.validatePasswordResetData, TokenHandler.verifyToken, PasswordController.resetPassword);

export default router;
