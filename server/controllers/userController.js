import UserHelpers from '../helpers/UserHelper';
import PaginatingData from '../helpers/paginationHelper';
import TokenHelper from '../helpers/tokenHelper';

/**
 * This class contains.
 * all methods, to users endpoint.
 */
class UserController {
  /**
   * This method handle the role setting.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} retrived user.
   */
  static async updateRole(req, res) {
    try {
      const { role } = req.body;
      const { userId } = req.params;
      const userExists = await UserHelpers.userExists('id', userId);
      if (userExists) {
        await UserHelpers.updateRole({ userId, role });
        return res.status(200).json({
          status: 200,
          message: `User role has been successfully updated from ${userExists.role} to ${role}.`,
          user: userId
        });
      }
      return res.status(404).json({ status: 404, error: `user with user id ${userId} does not exist` });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: error.message
      });
    }
  }

  /**
   * This method handle the users PaginatingData.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} retrived user.
   */
  static async retrieveUsers(req, res, next) {
    try {
      const {
        start, end, pages, skip, paginate
      } = await PaginatingData.paginateData(req.query);
      const allUsers = await UserHelpers.getAllUsers(skip, start);
      const paginatedData = allUsers.rows;
      const dataCount = allUsers.count;
      if (paginatedData.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No users found'
        });
      }
      req.data = {
        paginatedData, dataCount, start, end, pages, skip, paginate
      };
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: error.message
      });
    }
  }

  /**
   * This method handles view a user requests.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async retrieveUser(req, res) {
    try {
      const { userId } = req.params;
      const foundUser = await UserHelpers.userExists('id', userId);
      if (foundUser) {
        return res.status(200).json({
          status: 200,
          data: foundUser
        });
      }
      res.status(404).json({
        status: 404,
        error: `No user found with this id ${userId}`
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: error.message
      });
    }
  }

  /**
   * This method handle the update profile request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async updateProfile(req, res) {
    const { token } = req.headers;
    const { id } = TokenHelper.verifyToken(token);
    const {
      lastname,
      firstname,
      username,
      gender,
      birthDate,
      preferredLanguage,
      preferredCurrency,
      location,
      department,
      emailNotifications,
      inAppNotifications
    } = req.body;
    const data = {
      lastname,
      firstname,
      username,
      gender,
      birthDate,
      preferredLanguage,
      preferredCurrency,
      location,
      department,
      emailNotifications,
      inAppNotifications,
      updatedAt: new Date()
    };

    const update = await UserHelpers.updateUser(id, data);

    res.status(200).send({
      status: 200,
      message: 'user profile has been successfuly updated',
      data: update
    });
  }

  /**
* This method handle the retrieves user profile.
* @param {object} req The user's request.
* @param {object} res The response.
* @returns {object} The status and some data of the user profile.
*/
  static async retrieveProfile(req, res) {
    const { username } = req.params;
    const userProfile = await UserHelpers.userExists('username', username);
    res.status(200).send({
      status: 200,
      data: userProfile
    });
  }
}


export default UserController;
