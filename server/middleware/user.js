import UserHelper from '../helpers/userHelper';
import TokenHelper from '../helpers/tokenHelper';

/**
 * This class contains methods
 * for authorizing user-related operations
 */
class User {
  /**
   * This method verifies whether email is used.
   * @param {object} req the user's request.
   * @param {object} res the response.
   * @param {Function} next pass to next function.
   * @returns {object} message indicating used email.
   */
  static async verifyUsedEmail(req, res, next) {
    try {
      const { email } = req.body;
      const usedEmail = await UserHelper.findUser({ email });
      if (usedEmail === null) {
        next();
      } else {
        res.status(409).send({
          status: 409,
          message: 'The specified email is already taken'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying used email',
        error: error.message
      });
    }
  }

  /**
   * This method verifies whether username is used.
   * @param {object} req the user's request.
   * @param {object} res the response.
   * @param {Function} next pass to next function
   * @returns {object} message indicating used username.
   */
  static async verifyUsedUsername(req, res, next) {
    try {
      const { username } = req.body;
      const user = await UserHelper.findUser({ username });
      if (user === null || username === undefined) {
        next();
      } else {
        res.status(409).send({
          status: 409,
          message: 'The specified username is already taken'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying used username',
        error: error.message
      });
    }
  }

  /**
   * This method verifies profile owner.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} message indicating an error.
   */
  static async verifyProfileOwner(req, res, next) {
    const { username } = req.params;
    const { token } = req.headers;
    try {
      const user = await UserHelper.findUser({ username });
      const data = TokenHelper.verifyToken(token);
      if (user !== null) {
        if (data.username === username || data.id === user.id) {
          next();
        } else {
          res.status(401).send({
            status: 401,
            message: "You don't have permission to access the specified user profile",
          });
        }
      } else {
        res.status(404).send({
          status: 404,
          message: "The specified username doesn't exist",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying profile owner',
        error: error.message
      });
    }
  }


  /**
   * This method verifies user role.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} message indicating an error.
   */
  static async verifyRole(req, res, next) {
    try {
      if (req.user.role === 'Super Administrator') {
        return next();
      }
      return res.status(401).json({
        status: 401,
        error: 'Sorry! you don\'t have the permission'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying user role',
        error: error.message
      });
    }
  }
}
export default User;
