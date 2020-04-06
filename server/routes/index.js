import { Router } from 'express';
import auth from './auth';
import UserRoutes from './userRoute';

const router = Router();
router.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'Welcome to nomad champs ',
  });
});
router.use('/auth', auth);
router.use(UserRoutes);

export default router;
