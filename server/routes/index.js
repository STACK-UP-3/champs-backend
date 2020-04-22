import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoute';
import placeRoutes from './placeRoutes';
import tripRoutes from './tripRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use(userRoutes);
router.use(placeRoutes);
router.use(tripRoutes);
export default router;
