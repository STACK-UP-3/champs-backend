import { Router } from 'express';
import userRoutes from './userRoutes';
import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';
import placeRoutes from './placeRoutes';

const router = Router();

router.use(userRoutes);
router.use(tripRoutes);
router.use(placeRoutes);
router.use('/auth', authRoutes);

export default router;
