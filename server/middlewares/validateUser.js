import { userSchema } from '../schemas/userSchema';
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
  static validateUser(req, res, next) {
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
export default validateUser;
