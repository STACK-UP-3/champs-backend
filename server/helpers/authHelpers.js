import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';
import bcrypt from 'bcrypt';
import { User } from '../sequelize/models/index';


config();
const {
  SENDGRID_API_KEY, VERIFY_URL, RESET_URL
} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * This class contains all methods
 * required to handle send email confirmation link,
 * generate and verify token, password reset and update.
 */
class AuthHelper {
  /**
     * This method sends an confirmation email and reset password link to user.
     * @param {object} email The user's request.
     * @param {object} token The response.
     * @param {object} task The operation to be done.
     * @returns {object} The status and some data of the user.
     */
  static async sendMail(email, token, task) {
    let message, url;

    if (task === 'password-reset') {
      url = `${RESET_URL}/${email}/${token}`;
      message = {
        to: email,
        from: 'champsdev2@gmail.com',
        subject: 'Reset Password Link',
        text: 'Reset Password Link',
        html: `
        <div style="background-color: white;border: wheat 2px solid;padding: 20px;
        max-width: 50vw;margin: 50px;align-items: center;height: 45vh;">
            <h1 style="font-size: 25px;margin-top: 30px;">You received the reset password link</h1>
            <p style="font-family: fantasy;font-size: 20px;">Copy the following link and use it your favorite API testing platform such as Postman or Insomnia to reset your password: </p>
            <p> ${url} </p>
        </div>
        `,
      };
    } else {
      url = `${VERIFY_URL}/${token}`;
      message = {
        to: email,
        from: 'champsdev2@gmail.com',
        subject: 'Confirmation email',
        text: 'welcome to nomad champs',
        html: `
      <div style="background-color: white;border: wheat 2px solid;padding: 20px;
      max-width: 50vw;margin: 50px;align-items: center;height: 45vh;">
          <h1 style="font-size: 25px;margin-top: 30px;">Welcome to Nomad champs</h1>
          <p style="font-family: fantasy;font-size: 20px;">Comfirm your email to proceed to Nomad champs</p>
          <button style="background-color: rgb(11, 132, 212);
          width: 130px;height: 30px;border: none;margin-top: 40px;
          "><a href="${url}" style="text-decoration: none;color: white;font-size: 14px;
          ">
          Confirm Email</a>
          </button>
      </div>
      `,
      };
    }

    try {
      sgMail.send(message);
      return { isSent: true };
    } catch (error) {
      return {
        isSent: false,
        error
      };
    }
  }

  /**
     * This method updates the user password.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user.
     */
  static async updateUserPassword({ email, password }) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      await User.update({ password: passwordHash }, { where: { email } });
      return true;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method updates the users to be verified in the database.
   * @param {Number} id the id of the user to be verified.
   * @returns {Boolean}  if the data were created or not.
   */
  static async verifyUserEmail(id) {
    const verify = await User.update({ isVerified: true }, { where: { id } });
    return verify !== undefined;
  }
}

export default AuthHelper;
