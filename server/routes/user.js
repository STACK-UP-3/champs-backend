import { Router } from 'express';
import userController from '../controllers/UserController';
import validateUser from '../middlewares/validateUser';
import tokenValidator from '../middlewares/tokenValidator';
import profileOwner from '../middlewares/profileOwner';
import checkUser from '../middlewares/checkUser';

const router = Router();
router.patch('/:username/profile', tokenValidator, profileOwner, validateUser.validateUserData, checkUser.isUserNameUsed, userController.updateProfile);
router.get('/:username/profile', tokenValidator, profileOwner, userController.retrieveProfile);
export default router;
