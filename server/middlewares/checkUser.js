import jwt from 'jsonwebtoken';
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
    const { email } = req.body;
    const user = await AuthHelper.findUser(email);
    if (user === null) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: 'The specified email is already taken'
      });
    }
  }

  /**
   * This method Checks if the User's email is already in use .
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} The status and some data of the user.
   */
  static checkSignIn(req, res, next) {
    const { token } = req.headers;
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) next();
    } catch (error) {
      res.status(401).send({
        status: 401,
        error: 'authentication failed'
      });
    }
  }
}
export default checkUser;
