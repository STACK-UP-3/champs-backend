import bcrypt from 'bcrypt';
import authHelper from '../helpers/authHelpers';

/**
 * This class contains all methods
 * required to handle all
 * authentication routes.
 */
class authController {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async signUp(req, res) {
    const {
      lastname, firstname, email, password
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      lastname,
      firstname,
      email,
      password: hashedPassword,
      isVerified: false
    };
    const user = await authHelper.createUser(data);
    if (user) {
      const token = await authHelper.createToken({
        id: user.id,
        email
      });
      const mail = await authHelper.sendMail(email, token);
      if (mail.isSent === true) {
        res.status(201).send({
          status: 201,
          message: 'Account succesfully created, check your email to confirm'
        });
      } else {
        res.status(500).send({
          status: 500,
          message: 'the email was\'t sent check if your email address is corect',
          mail
        });
      }
    } else {
      res.status(500).send({
        status: 500,
        message: 'Internal server error'
      });
    }
  }

  /**
   *  this method handles the email verification.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async verifyEmail(req, res) {
    const { token } = req.params;
    const { id } = await authHelper.verifyToken(token);
    if (id) {
      authHelper.verifyUser(id);
      res.status(200).send({
        userid: id,
        message: ' Your email has been successfully verified',
      });
    } else {
      res.status(400).send({
        status: 400,
        message: 'invalid token'
      });
    }
  }
}

export default authController;
