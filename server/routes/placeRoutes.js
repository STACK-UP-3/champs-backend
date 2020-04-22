import { Router } from 'express';
import ValidatePlace from '../middlewares/placeValidator';
import validateToken from '../middlewares/tokenValidator';
import PaginateData from '../middlewares/paginationMiddleware';
import PlaceController from '../controllers/placeController';
import paginationValidator from '../middlewares/paginationValidator';
import CheckUser from '../middlewares/checkUser';


const router = Router();
router.post('/places/', validateToken, CheckUser.checkRole, ValidatePlace.placeValidate, PlaceController.createPlace);
router.get('/places/:placeId', validateToken, ValidatePlace.isValidatorId, PlaceController.retrievePlace);
router.get('/places', validateToken, paginationValidator, PlaceController.retrieveAllPlaces, PaginateData.paginatedRetrievedData);

export default router;
