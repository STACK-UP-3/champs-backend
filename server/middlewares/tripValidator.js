import tripHelpers from '../helpers/tripHelper';
import placeHelpers from '../helpers/placeHelper';
import AccommodationHelper from '../helpers/accommodationHelper';
import { dateValidator, returnDate } from '../helpers/dateValidator';
import tripSchemas from '../schemas/tripSchema';
import idSchemas from '../schemas/idValidator';


/**
 * This class contains all methods
 * required to validate
 * sent data from the UI.
 */
class validatetrip {
  /**
   * This method validates the data sent from the UI.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} The error and some error messages .
   */
  static tripValidator(req, res, next) {
    const {
      error
    } = tripSchemas.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const {
        details
      } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: message
      });
    }
  }

  /**
   * This method validates the data sent from the UI.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} The error and some error messages .
   */
  static isValidatorId(req, res, next) {
    const {
      error
    } = idSchemas.validate({ id: req.params.tripId });
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const {
        details
      } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: `Trip ${message}`
      });
    }
  }

  /**
   * This method validates the data sent from the UI.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} The error and some error messages .
   */
  static async tripChecker(req, res, next) {
    const {
      body,
      user
    } = req;

    const placeIds = body.destination;
    const userId = user.id;
    const tripExists = await tripHelpers.findByReasonOrDate({
      ...body,
      userId
    });
    const errors = {};
    const placeExistsFrom = await placeHelpers.placeExist('id', body.departure);
    const placeExistsTo = await placeHelpers.placeExist('id', placeIds);
    const isValideDate = dateValidator(body.date);
    const isRtnDate = returnDate({ dateR: body.returnDate, dateS: body.date });

    const accommodation = {
      id: body.accommodationId,
      placeIds
    };
    const accommodationExist = await AccommodationHelper.findAccommodation(accommodation);
    if (placeExistsFrom.length === 0) {
      errors.departure = 'choose proper departure location.';
    }
    if (!accommodationExist.length === 0) {
      errors.accommodation = 'choose available accommodation.';
    }
    if (placeExistsTo.length === 0) {
      errors.destination = 'choose proper destination location.';
    }
    if (isRtnDate) {
      errors.reasonsDate = 'Your return date is lower than Travel date.';
    }
    if (isValideDate) {
      errors.date = 'The date is in the past, please choose a future date.';
    }
    if (Object.keys(errors).length !== 0) {
      return res.status(422).json({
        status: 422,
        error: errors
      });
    }
    if (tripExists) {
      return res.status(409).json({
        status: 409,
        error: 'This trip already exists, use another reasons or date.'
      });
    }
    req.departure = placeExistsFrom;
    req.destination = placeExistsTo;
    req.accommodation = accommodationExist;
    next();
  }
}

export default validatetrip;
