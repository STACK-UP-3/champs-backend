import { Router } from 'express';
import TripController from '../controllers/tripController';
import validateTrip from '../middlewares/tripValidator';
import validateToken from '../middlewares/tokenValidator';
import paginate from '../middlewares/paginationMiddleware';


const router = Router();
router.post('/trips', validateToken, validateTrip.tripValidator, validateTrip.tripChecker, TripController.createTrip);
router.get('/trips/:tripId', validateToken, validateTrip.isValidatorId, TripController.retrieveTrip);
router.get('/trips', validateToken, TripController.retrieveAllTrips, paginate.paginatedRetrievedData);

export default router;
