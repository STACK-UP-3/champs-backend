import Joi from '@hapi/joi';
import idSchemas from '../schemas/idValidator';
import userSchema from '../schemas/userSchema';
/**
 * This class contains all methods
 * required to validate
 * sent data from the UI.
 */
class ValidateUser {
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
    } = idSchemas.validate({ id: req.params.userId });
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
   * This method validates if the User's username is already in use .
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} The status and error message.
   */
  static async validate(req, res, next) {
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
   * This method validates the data sent from the UI.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} The error and some error messages .
   */
  static validateUserData(req, res, next) {
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
}
export default ValidateUser;
