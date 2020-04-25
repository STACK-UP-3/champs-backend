import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';
import UserHelper from './userHelper';
import { User } from '../sequelize/models/index';
import PasswordHelper from './passwordHelper';

config();

const {
  SENDGRID_API_KEY, VERIFY_URL, RESET_URL
} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * This class contains methods
 * that handle authentication related operations
 */
class AuthHelper {
  /**
     * This method sends a confirmation email and password reset link to the user.
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
      return error;
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
   * This method verifies user email.
   * @param {Number} id id of the user whose email is to be verified.
   * @returns {Boolean}  True when user email is verified, False if is not.
   */
  static async verifyUserEmail(id) {
    try {
      const verify = await User.update({ isVerified: true }, { where: { id } });
      return verify !== undefined;
    } catch (err) {
      return err;
    }
  }

  /**
     * This method signs a user in.
     * @param {string} email The user's email to be checked.
     * @param {string} password The user's password to be compared.
     * @param {Function} done supplies user credentials after user is successfully checked.
     * @returns {Function} returns a message for incorrect user email or Password.
     */
  static async signInLocal(email, password, done) {
    try {
      const user = await UserHelper.findUser({ email });
      if (user) {
        if (user.isVerified === false) return done('Please confirm your email before logging in!');

        const passwordExist = await PasswordHelper
          .comparePasswords(password, user.password);
        if (passwordExist) return done(null, user);
      }
      return done('Password or email is incorrect');
    } catch (error) {
      return error;
    }
  }
}

export default AuthHelper;
