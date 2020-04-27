import Joi from '@hapi/joi';
import DateHelper from '../helpers/dateHelper';
import idSchema from '../schemas/idValidator';
import userSchema from '../schemas/userSchema';
import TripHelper from '../helpers/tripHelper';
import tripSchema from '../schemas/tripSchema';
import PlaceHelper from '../helpers/placeHelper';
import placeSchema from '../schemas/placeSchema';
import AccommodationHelper from '../helpers/accommodationHelper';

import {
  signupSchema,
  signinSchema,
  resetSchema,
  updatePasswordSchema
} from '../schemas/authSchema';


/**
 * This class contains all methods
 * required to validate all
 * sent data from the API consumer.
 */
class Validation {
  /**
   * This method validates the data sent from the API consumer for signing up a user.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validateSignUpData(req, res, next) {
    const { error } = signupSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        message
      });
    }
  }

  /**
   * This method validates the data sent from the API consumer for signing in a user.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validateSignInData(req, res, next) {
    const { error } = signinSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        message
      });
    }
  }

  /**
   * This method validates email.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @param {object} next pass to next method.
     * @returns {object} Error message.
     */
  static validateEmail(req, res, next) {
    const { error } = resetSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: message
      });
    }
  }

  /**
   * This method validates the data sent from the API consumer for resetting password.
       * @param {object} req The user's request.
       * @param {object} res The response.
       * @param {object} next pass to next method.
       * @returns {object} Error message.
       */
  static validatePasswordResetData(req, res, next) {
    const { error } = updatePasswordSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: message
      });
    }
  }


  /**
   * This method validates the user id sent from the API consumer.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validateUserId(req, res, next) {
    const { error } = idSchema.validate({ id: req.params.userId });
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
        error: `User ${message}`
      });
    }
  }


  /**
   * This method validates the trip id sent from the API consumer.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validateTripId(req, res, next) {
    const {
      error
    } = idSchema.validate({ id: req.params.tripId });
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
   * This method validates the place id sent from the API consumer.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validatePlaceId(req, res, next) {
    const {
      error
    } = idSchema.validate({ id: req.params.placeId });
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
        error: `Place ${message}`
      });
    }
  }

  /**
     * This method validates place data from the API consumer.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @param {object} next pass to next method.
     * @returns {object} Error message.
     */
  static validatePlaceData(req, res, next) {
    const { error } = placeSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: message
      });
    }
  }

  /**
   * This method validates user role from API consumer.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} Error message.
   */
  static async validateUserRole(req, res, next) {
    const Schema = Joi.object().keys({
      role: Joi.string().trim()
        .required().pattern(new RegExp('^Super Administrator$|^Travel Administrator$|^Supplier$|^Manager$|^Requester$'))
    });
    const result = Schema.validate({ role: req.body.role }, {
      abortEarly: false
    });
    const valid = result.error == null;
    if (valid) {
      return next();
    }
    return res.status(400).json({ status: 400, error: 'Only the follwing values are allowed: Super Administrator, Travel Administrator, Supplier, Manager,Requester' });
  }

  /**
   * This method validates notification data from the API consumer.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static validateNotificationData(req, res, next) {
    const { emailNotifications, inAppNotifications } = req.body;
    if (emailNotifications === false && inAppNotifications === false) {
      res.status(400).json({
        status: 400,
        message: 'All notifications can\'t be turned of, please turn on notifications'
      });
    } else {
      const { error } = userSchema.validate(req.body);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        res.status(422).json({
          status: 422,
          message
        });
      }
    }
  }

  /**
   * This method validates trip data from the API consumer.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} Error message.
   */
  static async validateTripData(req, res, next) {
    const { error } = tripSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      const {
        body,
        user
      } = req;

      const placeIds = body.destination;
      const userId = user.id;
      const tripExists = await TripHelper.findByReasonOrDate({
        ...body,
        userId
      });

      const errors = {};
      const placeExistsFrom = await PlaceHelper.placeExist('id', body.departure);
      const placeExistsTo = await PlaceHelper.placeExist('id', body.destination);
      const isValideDate = DateHelper.formatDate(body.date);
      const isRtnDate = DateHelper.verifyStartReturnDate(body.returnDate, body.date);

      const accommodation = {
        id: body.accommodationId,
        placeIds
      };
      const accommodationExist = await AccommodationHelper.findAccommodation(accommodation);

      if (placeExistsFrom.length === 0) {
        errors.departure = 'choose proper departure location.';
      }
      if (accommodationExist.length === 0) {
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
   * This method validates pagination data from the API consumer.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object}  Error message.
   */
  static validatePagination(req, res, next) {
    const Schema = Joi.object().keys({
      limit: Joi.number().integer().min(1),
      page: Joi.number().integer().min(1),
    });
    const joiMessage = (error) => {
      const { details } = error;
      const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
      return message;
    };
    const result = Schema.validate({ limit: req.query.limit, page: req.query.page }, {
      abortEarly: false
    });
    const valid = result.error == null;
    if (valid) {
      return next();
    }
    return res.status(400).json({ status: 400, error: joiMessage(result.error) });
  }
}

export default Validation;
