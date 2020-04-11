import models from '../sequelize/models';

const { User } = models;

/**
 * This class contains.
 * three methods, to find users or user in database.
 */
class UserHelper {
  /**
 * find a user with a condition.
 * @param {string} attr .
 * @param {string} val .
 * @returns {object} User data.
 */
  static async userExists(attr, val) {
    const user = await User.findOne({
      where: {
        [attr]: val
      }
    });
    return user;
  }

  /**
 * update a user with a condition.
 * @param {string} userId .
 * @param {string} role .
 * @returns {object} User data.
 */
  static async updateRole({ userId, role }) {
    const user = await User.update({
      role
    }, {
      where: {
        id: userId
      }
    });
    return user;
  }

  /**
 * get all a user with a condition.
 * @param {string} skip .
 * @param {string} start .
 * @returns {object} User data.
 */
  static async getAllUsers(skip, start) {
    const foundUsers = await User.findAndCountAll({
      limit: skip,
      offset: start,
      attributes: { exclude: ['password'] },
    });
    return foundUsers;
  }
}

export default UserHelper;
