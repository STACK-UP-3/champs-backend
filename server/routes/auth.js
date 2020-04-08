import { Router } from 'express';
import AuthController from '../controllers/authController';
import validateAuth from '../middlewares/validateAuth';
import checkUser from '../middlewares/checkUser';

const router = Router();
router.post('/signup', validateAuth.validateSignup, checkUser.isUser, AuthController.signUp);
router.get('/verify/:token', AuthController.verifyEmail);
router.post('/signin', validateAuth.validateSignIn, AuthController.signIn);
export default router;
