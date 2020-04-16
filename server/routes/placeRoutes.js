import { Router } from 'express';
import validatePlace from '../middlewares/placeValidator';
import validateToken from '../middlewares/tokenValidator';
import paginate from '../middlewares/paginationMiddleware';
import PlaceController from '../controllers/placeController';
import isSuperAdmin from '../middlewares/isSuperAdmin';
import paginationValidator from '../middlewares/paginationValidator';


const router = Router();
router.post('/places/', validateToken, isSuperAdmin, validatePlace.placeValidate, PlaceController.createPlace);
router.get('/places/:placeId', validateToken, validatePlace.isValidatorId, PlaceController.retrievePlace);
router.get('/places', validateToken, paginationValidator, PlaceController.retrieveAllPlaces, paginate.paginatedRetrievedData);

export default router;
