import UserHelpers from '../helpers/UserHelper';
import pagination from '../helpers/paginationHelper';
import authHelper from '../helpers/authHelpers';

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
    return res.status(404).json({ status: 404, error: `user with username ${userId} does not exist` });
  }

  /**
   * This method handle the users pagination.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} retrived user.
   */
  static async getAllUsers(req, res, next) {
    try {
      const {
        start, end, pages, skip, paginate
      } = await pagination.paginateData(req.query);
      const allUsers = await UserHelpers.getAllUsers(skip, start);
      const userAllData = allUsers.rows;
      const countUserData = allUsers.count;
      if (allUsers.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: `${req.user.email} No users found`
        });
      }
      req.data = {
        userAllData, countUserData, start, end, pages, skip, paginate
      };
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: ' something goes wrong ',
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
    const { id } = authHelper.verifyToken(token);
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
      inAppNotifications
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
