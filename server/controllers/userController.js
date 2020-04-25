import UserHelper from '../helpers/userHelper';
import TokenHelper from '../helpers/tokenHelper';
import DataPagination from '../helpers/paginationHelper';
import models from '../sequelize/models';

/**
 * This class contains
 * methods that handle user-related operations.
 */
class UserController {
  /**
   * This method updates the user role.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} retrived user.
   */
  static async updateRole(req, res) {
    try {
      const { role } = req.body;
      const { userId } = req.params;
      const { User } = models;
      const user = await UserHelper.findUser({ id: userId });
      if (user) {
        const { password, ...userExists } = user.dataValues;

        if (userExists) {
          await User.update({
            role,
            updatedAt: new Date()
          }, {
            where: {
              id: userId
            },
          });
          return res.status(200).json({
            status: 200,
            message: `User role has been successfully updated from ${userExists.role} to ${role}.`,
            user: userId
          });
        }
      }
      res.status(404).json({ status: 404, error: `User with id ${userId} does not exist` });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when updating the role',
        error: error.message
      });
    }
  }

  /**
   * This method retrieves users.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} retrived user.
   */
  static async retrieveUsers(req, res, next) {
    try {
      const {
        start, end, pages, skip, paginate
      } = await DataPagination.paginateData(req.query);
      const allUsers = await UserHelper.retrieveUsers(skip, start);
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
        message: 'Something went wrong when retrieving users',
        error: error.message
      });
    }
  }

  /**
   * This method retrieves a user.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async retrieveUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await UserHelper.findUser({ id: userId });
      if (user) {
        const { password, ...foundUser } = user.dataValues;

        if (foundUser) {
          return res.status(200).json({
            status: 200,
            data: foundUser
          });
        }
      }
      res.status(404).json({
        status: 404,
        error: `User with id ${userId} was not found`
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when retrieving the user',
        error: error.message
      });
    }
  }

  /**
   * This method updates a user profile.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async updateProfile(req, res) {
    try {
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

      const update = await UserHelper.updateUser(id, data);

      res.status(200).send({
        status: 200,
        message: 'User profile has been successfuly updated',
        data: update
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when updating the user profile',
        error: error.message
      });
    }
  }

  /**
    * This method retrieves a user profile.
    * @param {object} req The user's request.
    * @param {object} res The response.
    * @returns {object} The status and some data of the user profile.
    */
  static async retrieveProfile(req, res) {
    try {
      const { username } = req.params;
      const user = await UserHelper.findUser({ username });
      const { password, ...userProfile } = user.dataValues;

      res.status(200).send({
        status: 200,
        data: userProfile
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when retrieving profile',
        error: error.message
      });
    }
  }
}


export default UserController;
