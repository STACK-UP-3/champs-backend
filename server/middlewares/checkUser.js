import AuthHelper from '../helpers/authHelpers';

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
    const { email, username } = req.body;
    const user1 = await AuthHelper.findUser({ email });
    const user2 = await AuthHelper.findUser({ username });
    if (user1 === null && user2 === null) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: 'The specified email or username is already taken'
      });
    }
  }

  /**
   * This method Checks if the User's username is already in use .
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} The status and error message.
   */
  static async isUserNameUsed(req, res, next) {
    const { username } = req.body;
    const user = await AuthHelper.findUser({ username });
    if (user === null || username === undefined) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: 'The specified username is already taken'
      });
    }
  }
}
export default checkUser;
