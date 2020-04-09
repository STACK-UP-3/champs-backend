import { User } from '../sequelize/models/index';

/**
 * This class contains all methods
 * required to handle
 * user data to the database.
 */
class userhelper {
  /**
   * This method updates the user in the database.
   * @param {Number} id The id of user to update
   * @param {object} data The data to create a user.
   * @returns {object}  some data of the updated user in thr database.
   */
  static async updateUser(id, data) {
    try {
      const affectedRows = await User.update(data, {
        where: { id },
        returning: true,
        plain: true
      });
      if (affectedRows) {
        const user = await User.findAll({
          where: { id },
          attributes: { exclude: ['password'] }
        });
        return user;
      }
    } catch (error) {
      return error;
    }
  }
}

export default userhelper;
