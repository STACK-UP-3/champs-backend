import Router from 'express';
import UserController from '../controllers/userController';
import paginationValidator from '../middlewares/paginationValidator';
import PaginateData from '../middlewares/paginationMiddleware';
import UserValidator from '../middlewares/userValidator'; // Revise naming
import tokenValidator from '../middlewares/tokenValidator';
import CheckUser from '../middlewares/checkUser';

const router = Router();

router.patch('/user/:username/profile', tokenValidator, CheckUser.profileOwner, UserValidator.validateUserData, CheckUser.isUserNameUsed, UserController.updateProfile);
router.get('/user/:username/profile', tokenValidator, CheckUser.profileOwner, UserController.retrieveProfile);

router.get('/users/', tokenValidator, paginationValidator, UserController.retrieveUsers, PaginateData.paginatedRetrievedData);
router.patch('/users/:userId/role', tokenValidator, CheckUser.checkRole, UserValidator.validate, UserController.updateRole);
router.get('/users/:userId', tokenValidator, UserValidator.isValidatorId, UserController.retrieveUser);

export default router;
