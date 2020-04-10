import { Router } from 'express';
import AuthController from '../controllers/authController';
import validateAuth from '../middlewares/validateAuth';
import checkUser from '../middlewares/checkUser';
import ResetController from '../controllers/resetController';

const router = Router();
router.post('/signup', validateAuth.validateSignup, checkUser.isUser, AuthController.signUp);
router.get('/verify/:token', AuthController.verifyEmail);
router.post('/signin', validateAuth.validateSignIn, AuthController.signIn);
router.post('/reset-link', validateAuth.validateResetPassword, ResetController.sendResetPasswordLink);
router.post('/update-password/:email/:token', validateAuth.validateToken, ResetController.updateNewPassword);

export default router;