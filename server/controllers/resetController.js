import { config } from 'dotenv';
import authHelper from '../helpers/authHelpers';

config();

/**
 * This class contains all methods
 * required to handle all
 * password reset and update.
 */
class ResetController {
  /**
     * This method checks if the user is already registered prior to resetting the password.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user.
     */
  static async sendResetPasswordLink(req, res) {
    const { email } = req.body;
    const registeredUser = await authHelper.findUser(email);
    const task = 'password-reset';

    if (registeredUser) {
      const token = await authHelper.createToken({
        id: registeredUser.id,
        email
      });

      await authHelper.sendMail(email, token, task);
      res.status(200).send({
        status: 200,
        message: 'Password reset link has been sent to your email. Check it out!'
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'User not registered in our system!',
      });
    }
  }

  /**
     * This method updates user password.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user.
     */
  static async updateNewPassword(req, res) {
    const { email } = req.params;
    const { password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      return res.status(400).json({
        status: 400,
        message: 'The passwords must match.',
      });
    }

    const result = authHelper.updateUserPassword({ email, password });

    if (result) {
      return res.status(200).json({
        status: 200,
        message: 'The password has been updated successfully.',
      });
    }
    return res.status(400).json({
      status: 400,
      message: `Failed to update the password due to ${result}.`,
    });
  }
}

export default ResetController;
