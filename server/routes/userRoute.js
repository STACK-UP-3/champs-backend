import Router from 'express';
import isSuperAdmin from '../middlewares/isSuperAdmin';
import userController from '../controllers/UserController';
import validateRole from '../middlewares/roleValidator';
import validateToken from '../middlewares/tokenValidator';
import paginationValidator from '../middlewares/paginationValidator';
import paginate from '../middlewares/paginationMiddleware';
import validateUser from '../middlewares/userValidator';

const router = Router();

router.get('/users/', validateToken, paginationValidator, userController.retrieveUsers, paginate.paginatedRetrievedData);
router.patch('/users/:userId/role', validateToken, isSuperAdmin, validateRole, userController.updateRole);
router.get('/users/:userId', validateToken, validateUser.isValidatorId, userController.retrieveUser);

export default router;
