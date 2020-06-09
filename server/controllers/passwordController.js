import { config } from 'dotenv';
import AuthHelper from '../helpers/authHelper';
import TokenHelper from '../helpers/tokenHelper';
import UserHelper from '../helpers/userHelper';

config();

/**
 * This class contains methods
 * required to handle all
 * password related operations.
 */
class PasswordController {
  /**
     * This method sends a password reset link to the user.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user.
     */
  static async sendPasswordResetLink(req, res) {
    const { email } = req.body;
    const registeredUser = await UserHelper.findUser(email);
    const task = 'password-reset';
    try {
      if (registeredUser) {
        const token = await TokenHelper.generateToken({
          id: registeredUser.id,
          email
        });

        await AuthHelper.sendMail(email, token, task);
        res.status(200).send({
          status: 200,
          message: 'Password reset link has been sent to your email. Check it out!'
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: 'User is not registered in our system!',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when sending a password reset link',
        error: error.message
      });
    }
  }

  /**
   *  This method handles the reset password operation.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async changePassword(req, res) {
    const { email, token } = req.params;
    res.redirect(`https://champs-frontend.herokuapp.com/reset-password?email=${email}&token=${token}`);
  }

  /**
     * This method updates user password.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user.
     */
  static async resetPassword(req, res) {
    try {
      const { email } = req.params;
      const { password, passwordConfirm } = req.body;
      if (password !== passwordConfirm) {
        return res.status(400).json({
          status: 400,
          message: 'The passwords must match.',
        });
      }

      const result = AuthHelper.updateUserPassword({ email, password });

      if (result) {
        return res.status(200).json({
          status: 200,
          message: 'The password has been reset successfully.',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when resetting the password',
        error: error.message
      });
    }
  }
}

export default PasswordController;
