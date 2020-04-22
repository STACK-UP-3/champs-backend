import TokenHelper from '../helpers/tokenHelper';
import UserHelper from '../helpers/UserHelper';
/**
 * This class contains methods
 * required to check specific users
 * in the database.
 */
class CheckUser {
  /**
   * This method Checks if the User's email is already in use .
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} The status and some data of the user.
   */
  static async isUser(req, res, next) {
    const { email, username } = req.body;
    const user1 = await UserHelper.findUser({ email });
    const user2 = await UserHelper.findUser({ username });
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
    const user = await UserHelper.findUser({ username });
    if (user === null || username === undefined) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: 'The specified username is already taken'
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
  static async profileOwner(req, res, next) {
    const { username } = req.params;
    const { token } = req.headers;
    const user = await UserHelper.findUser({ username });
    const data = TokenHelper.verifyToken(token);
    if (user !== null) {
      if (data.username === username || data.id === user.id) {
        next();
      } else {
        res.status(401).send({
          status: 401,
          message: "you don't have permission to access the specified user profile",
        });
      }
    } else {
      res.status(404).send({
        status: 404,
        message: "the specified username doesn't exist",
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
  static async checkRole(req, res, next) {
    if (req.user.role === 'Super Administrator') {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'Sorry! you don\'t have the permission'
    });
  }
}
export default CheckUser;
