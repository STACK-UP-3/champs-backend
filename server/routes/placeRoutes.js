import { Router } from 'express';
import User from '../middleware/user';
import Validations from '../middleware/validations';
import TokenHandler from '../middleware/tokenHandler';
import DataPagination from '../middleware/pagination';
import PlaceController from '../controllers/placeController';

const router = Router();

router.get('/places/:placeId', TokenHandler.verifyToken, Validations.validatePlaceId, PlaceController.retrievePlace);
router.post('/places/', TokenHandler.verifyToken, User.verifyRole, Validations.validatePlaceData, PlaceController.createPlace);
router.get('/places', TokenHandler.verifyToken, Validations.validatePagination, PlaceController.retrieveAllPlaces, DataPagination.paginateRetrievedData);

export default router;
