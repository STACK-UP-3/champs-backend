import { Router } from 'express';
import auth from './auth';
import UserRoutes from './userRoute';

const router = Router();

router.use('/auth', auth);
router.use(UserRoutes);

export default router;
