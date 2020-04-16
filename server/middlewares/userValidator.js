import idSchemas from '../schemas/idValidator';

/**
 * This class contains all methods
 * required to validate
 * sent data from the UI.
 */
class validateUser {
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
}
export default validateUser;
