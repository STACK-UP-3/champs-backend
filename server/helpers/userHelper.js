import models from '../sequelize/models';

/**
 * This class contains
 * methods for handling user-related operations.
 */
class UserHelper {
  /**
   * This method registers a user.
   * @param {object} data user information.
   * @returns {object} user information.
   */
  static async registerUser(data) {
    try {
      const { User } = models;
      const result = await User.create(data, {
        fields: [
          'lastname', 'firstname', 'email', 'username', 'password', 'role', 'isVerified'
        ]
      });
      return result;
    } catch (error) {
      return error;
    }
  }


  /**
   * This method finds a user.
   * @param {String} data user id.
   * @returns {Boolean} user data.
   */
  static async findUser(data) {
    try {
      const { User } = models;
      const user = await User.findOne({ where: data });
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method updates a user.
   * @param {string} column value column.
   * @param {object} data user data.
   * @returns {object} user data.
   */
  static async updateUser(column, data) {
    try {
      const { User } = models;
      const affectedRows = await User.update(data, {
        where: {
          column
        },
        returning: true,
        plain: true
      });
      if (affectedRows) {
        const user = await User.findOne({
          where: {
            column
          },
          attributes: {
            exclude: ['password']
          }
        });
        return user;
      }
    } catch (error) {
      return error;
    }
  }


  /**
   * This method retrieves users.
   * @param {string} skip limit
   * @param {string} start from
   * @returns {object}  user data.
   */
  static async retrieveUsers(skip, start) {
    try {
      const { User } = models;
      const foundUsers = await User.findAndCountAll({
        limit: skip,
        offset: start,
        attributes: {
          exclude: ['password']
        },
      });
      return foundUsers;
    } catch (error) {
      return error;
    }
  }
}

export default UserHelper;
