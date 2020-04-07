import { Router } from 'express';
import authController from '../controllers/authController';
import validateAuth from '../middlewares/validateAuth';
import checkUser from '../middlewares/checkUser';

const router = Router();
router.post('/signup', validateAuth.validateSignup, checkUser.isUser, authController.signUp);
router.get('/verify/:token', authController.verifyEmail);
export default router;
