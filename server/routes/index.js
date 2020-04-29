import { Router } from 'express';
import userRoutes from './userRoutes';
import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';
import placeRoutes from './placeRoutes';
import accommodationRoutes from './accommodationRoutes';

const router = Router();

router.use(userRoutes);
router.use(tripRoutes);
router.use(placeRoutes);
router.use('/auth', authRoutes);
router.use(accommodationRoutes);

export default router;
