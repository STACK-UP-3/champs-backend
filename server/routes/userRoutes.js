import { Router } from 'express';
import User from '../middleware/user';
import Validations from '../middleware/validations';
import DataPagination from '../middleware/pagination';
import TokenHandler from '../middleware/tokenHandler';
import UserController from '../controllers/userController';

const router = Router();

router.get('/users/:userId', TokenHandler.verifyToken, Validations.validateUserId, UserController.retrieveUser);
router.get('/user/:username/profile', TokenHandler.verifyToken, User.verifyProfileOwner, UserController.retrieveProfile);
router.patch('/users/:userId/role', TokenHandler.verifyToken, User.verifyRole, Validations.validateUserRole, UserController.updateRole);
router.get('/users/', TokenHandler.verifyToken, Validations.validatePagination, UserController.retrieveUsers, DataPagination.paginateRetrievedData);
router.patch('/user/:username/profile', TokenHandler.verifyToken, User.verifyProfileOwner, Validations.validateNotificationData, User.verifyUsedUsername, UserController.updateProfile);

export default router;
