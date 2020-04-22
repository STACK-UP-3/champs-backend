import { Router } from 'express';
import AuthController from '../controllers/authController';
import ValidateAuth from '../middlewares/validateAuth';
import CheckUser from '../middlewares/checkUser';
import ResetController from '../controllers/resetController';

const router = Router();
router.post('/signup', ValidateAuth.validateSignup, CheckUser.isUser, AuthController.signUp);
router.get('/verify/:token', AuthController.verifyEmail);
router.post('/signin', ValidateAuth.validateSignIn, AuthController.signIn);
router.post('/reset-link', ValidateAuth.validateResetPassword, ResetController.sendResetPasswordLink);
router.post('/update-password/:email/:token', ValidateAuth.validateUpdateResetPassword, ValidateAuth.validateToken, ResetController.updateNewPassword);

export default router;
