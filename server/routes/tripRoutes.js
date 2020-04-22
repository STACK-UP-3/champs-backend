import { Router } from 'express';
import TripController from '../controllers/tripController';
import ValidateTrip from '../middlewares/tripValidator';
import validateToken from '../middlewares/tokenValidator';
import PaginateData from '../middlewares/paginationMiddleware';


const router = Router();
router.post('/trips', validateToken, ValidateTrip.tripValidator, ValidateTrip.tripChecker, TripController.createTrip);
router.get('/trips/:tripId', validateToken, ValidateTrip.isValidatorId, TripController.retrieveTrip);
router.get('/trips', validateToken, TripController.retrieveAllTrips, PaginateData.paginatedRetrievedData);

export default router;
