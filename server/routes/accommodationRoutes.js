import Router from 'express';
import Validations from '../middleware/validations';
import TokenHandler from '../middleware/tokenHandler';
import Accommodation from '../controllers/accommodationController';

const router = Router();

router.post('/accommodation', TokenHandler.verifyToken, Validations.validateAccommodationData, Accommodation.registerAccomodation);

export default router;
