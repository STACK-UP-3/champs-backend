import Router from 'express';
import isSuperAdmin from '../middlewares/isSuperAdmin';
import userController from '../controllers/UserController';
import validateRole from '../middlewares/roleValidator';
import validateToken from '../middlewares/tokenValidator';
import paginationValidator from '../middlewares/paginationValidator';
import paginate from '../middlewares/paginationMiddleware';

const router = Router();

router.get('/users/', validateToken, isSuperAdmin, paginationValidator, userController.getAllUsers, paginate.paginatedRetrievedData);
router.patch('/users/:userId/role', validateToken, isSuperAdmin, validateRole, userController.updateRole);

export default router;
