import { Router } from 'express';
import auth from './auth';
import UserRoutes from './userRoute';
import user from './user';
import PlaceRoutes from './placeRoutes';
import TripRoutes from './tripRoutes';

const router = Router();

router.use('/auth', auth);
router.use(UserRoutes);
router.use(PlaceRoutes);
router.use(TripRoutes);

router.use('/user', user);
export default router;
