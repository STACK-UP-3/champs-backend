import { Router } from 'express';
import userController from '../controllers/userController';
import checkUser from '../middlewares/checkUser';
import validateUser from '../middlewares/validateUser';

const router = Router();
router.post('/update', checkUser.checkSignIn, validateUser.validateUser, userController.updateProfile);
export default router;
