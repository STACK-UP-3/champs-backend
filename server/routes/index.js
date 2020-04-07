import { Router } from 'express';
import auth from './auth';

const router = Router();
router.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'Welcome to nomad champs ',
  });
});
router.use('/auth', auth);
export default router;
