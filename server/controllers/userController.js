import userHelper from '../helpers/UserHelper';
import authHelper from '../helpers/authHelpers';

/**
 * This class contains all methods
 * required to handle all
 * User routes.
 */
class userController {
  /**
   * This method handle the update profile request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async updateProfile(req, res) {
    const { token } = req.headers;
    const {
      lastname,
      firstname,
      gender,
      birthdate,
      preferredlanguage,
      preferredcurrency,
      location,
      Department,
      emailNotifications,
      inAppNotifications
    } = req.body;
    const { id } = await authHelper.verifyToken(token);
    const data = {
      lastname,
      firstname,
      gender,
      birthdate,
      preferredlanguage,
      preferredcurrency,
      location,
      Department,
      emailNotifications,
      inAppNotifications
    };
    const update = await userHelper.updateUser(id, data);
    res.status(200).send({
      status: 200,
      message: 'user successfuly updated',
      data: update
    });
  }
}
export default userController;
