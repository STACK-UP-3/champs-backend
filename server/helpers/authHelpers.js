import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';
import bcrypt from 'bcrypt';
import { User } from '../sequelize/models/index';


config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * This class contains all methods
 * required to handle send email confirmation link,
 * generate and verify token, password reset and update.
 */
class authHelper {
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
      url = `${process.env.RESET_URL}/${email}/${token}`;
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
      url = `http://localhost:3000/api/v1/auth/verify/${token}`;
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
   * This method creates the user in the database.
   * @param {object} data The data to create a user.
   * @returns {object}  some data of the created user from database.
   */
  static async createUser(data) {
    const result = await User.create(data, {
      fields: [
        'lastname', 'firstname', 'email', 'password', 'isVerified'
      ]
    });
    return result;
  }


  /**
   * This method creates token used to confirm email.
   * @param {object} data the object that contain the data that is embedded with token.
   * @returns {String}  token created .
   */
  static async createToken(data) {
    try {
      const token = await jwt.sign(
        data, process.env.SECRET_KEY,
        { expiresIn: '2h' }
      );
      return token;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method verifies and decodes the token sent.
   * @param {String} token the string that contain a token.
   * @returns {object}  some data of the created user from database.
   */
  static verifyToken(token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      return data;
    } catch (err) {
      return err;
    }
  }

  /**
   * This method updates the users to be verified in the database.
   * @param {Number} id the id of the user to be verified.
   * @returns {Boolean}  if the data were created or not.
   */
  static async verifyUser(id) {
    const verify = await User.update({ isVerified: true }, { where: { id } });
    return verify !== undefined;
  }

  /**
   * This method searches a user with specific email in the Database.
   * @param {String} email the email of the user to be verified.
   * @returns {Boolean}  if the user exists or not.
   */
  static async findUser(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      return error;
    }
  }
}

export default authHelper;
