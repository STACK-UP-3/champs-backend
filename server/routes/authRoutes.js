import passport from 'passport';
import { Router } from 'express';
import User from '../middleware/user';
import Validations from '../middleware/validations';
import TokenHandler from '../middleware/tokenHandler';
import AuthController from '../controllers/authController';
import PasswordController from '../controllers/passwordController';

const router = Router();

router.get('/verify/:token', AuthController.verifyEmail);
router.post('/signin', Validations.validateSignInData, AuthController.signIn);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/google/return', User.verifyGoogleSignIn, AuthController.socialSignIn);
router.get('/facebook/return', User.verifyFacebookSignIn, AuthController.socialSignIn);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.post('/reset-link', Validations.validateEmail, User.verifyRegisteredEmail, PasswordController.sendPasswordResetLink);
router.post('/signup', Validations.validateSignUpData, User.verifyUsedEmail, User.verifyUsedUsername, AuthController.signUp);
router.get('/update-password/:email/:token', PasswordController.changePassword);
router.post('/update-password/:email/:token', Validations.validatePasswordResetData, TokenHandler.verifyToken, PasswordController.resetPassword);

export default router;
