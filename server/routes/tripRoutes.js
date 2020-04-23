import { Router } from 'express';
import Validations from '../middleware/validations';
import TokenHandler from '../middleware/tokenHandler';
import DataPagination from '../middleware/pagination';
import TripController from '../controllers/tripController';

const router = Router();

router.post('/trips', TokenHandler.verifyToken, Validations.validateTripData, TripController.createTrip);
router.get('/trips/:tripId', TokenHandler.verifyToken, Validations.validateTripId, TripController.retrieveTrip);
router.get('/trips', TokenHandler.verifyToken, TripController.retrieveAllTrips, DataPagination.paginateRetrievedData);

export default router;
