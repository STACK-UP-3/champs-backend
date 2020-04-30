import TripHelper from '../helpers/tripHelper';
import DataPagination from '../helpers/paginationHelper';

/**
 * This class contains all methods
 * required to handle
 * trip endpoints' requests.
 */
class TripController {
  /**
   * This method sets a trip type.
   * @param {object} trip The user's request.
   * @param {string} returnDate The response.
   * @returns {object} The status and some data of the trip.
   */
  static async setTripType(trip, returnDate) {
    try {
      if (returnDate) {
        trip.returnDate = returnDate;
        trip.tripType = 'Return';
      } else {
        trip.tripType = 'One-way';
      }
      return trip;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method handles a request for creating a trip.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async createTrip(req, res) {
    try {
      const { body } = req;
      const { lineManager } = req.user;
      if (lineManager !== null) {
        const {
          returnDate, destination, date, reasons, departure
        } = body;
        const myuserId = req.user.id;
        const pendingStatus = 'pending';
        const myReasons = reasons.trim();
        let newTrip = {
          departure,
          destination,
          date,
          reasons: myReasons,
          userId: myuserId,
          status: pendingStatus
        };

        const cityNumber = destination.length;

        newTrip = await TripController.setTripType(newTrip, returnDate, cityNumber);
        const foundTrip = await TripHelper.findByReasonOrDate({
          userId: myuserId,
          reasons: body.reasons,
          destination: body.destination,
          date: body.date
        });
        if (foundTrip) {
          return res.status(409).json({
            status: 409,
            data: 'You already created this trip'
          });
        }
        const savedTrip = await TripHelper.saveTrip(newTrip);
        savedTrip.departure = req.departure[0];
        savedTrip.destination = req.destination;

        return res.status(201).json({
          status: 201,
          message: 'Trip has been successfully created.',
          data: savedTrip
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Only a user who has a manager can request for a trip.'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when creating the trip',
        error: error.message
      });
    }
  }

  /**
   * This method handles view all trip requests.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} The status and some data of the trip.
   */
  static async retrieveAllTrips(req, res, next) {
    try {
      const { role, id } = req.user;
      const {
        start, end, pages, skip, paginate
      } = await DataPagination.paginateData(req.query);
      const foundTrips = await TripHelper.findTripByRole(role, id, skip, start);
      const paginatedData = foundTrips.rows;
      const dataCount = foundTrips.count;
      if (paginatedData.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'You don’t currently have any trip requests'
        });
      }
      req.data = {
        paginatedData, dataCount, start, end, pages, skip, paginate
      };
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when retrieving all trips',
        error: error.message
      });
    }
  }

  /**
   * This method handles retrieving single trip request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async retrieveTrip(req, res) {
    try {
      const { tripId } = req.params;
      const { role, id } = req.user;
      const foundTrip = await TripHelper.findTripById(tripId, { role, id });
      if (foundTrip) {
        return res.status(200).json({
          status: 200,
          message: 'Single trip retrieved successfully',
          data: foundTrip
        });
      }
      res.status(401).json({
        status: 401,
        error: ' You don’t have the permission for retrieving a trip request'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when retrieving the trip',
        error: error.message
      });
    }
  }

  /**
   * This method handles accepting or rejecting trip request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async respondTrip(req, res) {
    try {
      const { tripId } = req.params;
      const { status } = req.body;
      const { role, id } = req.user;
      const foundTrip = await TripHelper.findTripById(tripId, { role, id });
      if (foundTrip) {
        await TripHelper.updateTripById(tripId, { status });
        const updatedTrip = await TripHelper.findTripById(tripId, { role, id });
        return res.status(200).send({
          status: 200,
          message: `The Trip has been successfully ${status}`,
          data: updatedTrip
        });
      }
      res.status(404).json({
        status: 404,
        error: ' sorry, The trip you are trying to update doesn\'t exist'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when responding to the trip',
        error: error.message
      });
    }
  }
}

export default TripController;
