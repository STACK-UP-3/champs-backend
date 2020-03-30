import authHelper from '../helpers/authHelpers';

/**
 * This class contains methods
 * required to check specific users
 * in the database.
 */
class checkUser {
  /**
   * This method Checks if the User's email is already in use .
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} The status and some data of the user.
   */
  static async isUser(req, res, next) {
    const { email } = req.body;
    const user = await authHelper.findUser(email);
    if (user === null) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: 'The specified email is already taken'
      });
    }
  }
}
export default checkUser;
