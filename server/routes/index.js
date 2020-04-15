import { Router } from 'express';
import auth from './auth';
import UserRoutes from './userRoute';
import user from './user';

const router = Router();

router.use('/auth', auth);
router.use(UserRoutes);

router.use('/user', user);
export default router;
