import PlaceHelpers from '../helpers/placeHelper';
import pagination from '../helpers/paginationHelper';

/**
 * This class contains all methods
 * required to handle
 * trip endpoints' request.
 */
class PlaceController {
  /**
   * This method handle createPlace request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the place.
   */
  static async createPlace(req, res) {
    try {
      const { body } = req;
      const newPlace = {
        name: body.name,
        country: body.country,
        city: body.city,
      };
      const foundPlace = await PlaceHelpers.placeExist('name', body.name);
      if (foundPlace.length !== 0) {
        return res.status(409).json({
          status: 409,
          data: `${body.name} place already exists, use diferent name.`
        });
      }
      const savePlace = await PlaceHelpers.savePlace(newPlace);

      return res.status(201).json({
        status: 201,
        message: `${body.name} place was created successfully.`,
        data: savePlace
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: error.message
      });
    }
  }

  /**
   * This method handles view all place requests.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} The status and some data of the trip.
   */
  static async retrieveAllPlaces(req, res, next) {
    try {
      const {
        start, end, pages, skip, paginate
      } = await pagination.paginateData(req.query);
      const { rows, count } = await PlaceHelpers.allPlace(skip, start);

      const paginatedData = rows;
      const dataCount = count;
      if (paginatedData.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No places found'
        });
      }
      req.data = {
        paginatedData, dataCount, start, end, pages, skip, paginate
      };
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: error.message
      });
    }
  }

  /**
   * This method handles a request for retrieving a place.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async retrievePlace(req, res) {
    try {
      const { placeId } = req.params;
      const foundPlace = await PlaceHelpers.placeExist('id', placeId);
      if (foundPlace.length > 0) {
        return res.status(200).json({
          status: 200,
          data: foundPlace
        });
      }
      res.status(404).json({
        status: 404,
        error: `No place found with this id ${placeId}`
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: error.message
      });
    }
  }
}

export default PlaceController;
