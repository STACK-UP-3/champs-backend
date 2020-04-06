import bcrypt from 'bcrypt';
import passport from 'passport';

import AuthHelper from '../helpers/authHelpers';
import TokenHelper from '../helpers/tokenHelper';
/**
 * This class contains all methods
 * required to handle all
 * authentication routes.
 */
class AuthController {
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
    const user = await AuthHelper.createUser(data);
    if (user) {
      const token = await AuthHelper.createToken({
        id: user.id,
        email
      });
      const mail = await AuthHelper.sendMail(email, token);
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
    const { id } = await AuthHelper.verifyToken(token);
    if (id) {
      AuthHelper.verifyUser(id);
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

  /**
     * This method handle the sign request.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user.
     */
  static async signIn(req, res) {
    passport.authenticate(
      'local',
      { session: false },
      (error, user) => {
        if (error || !user) {
          return res.status(404).json({ error });
        }
        const {
          id, firstname, lastname, email, role, isVerified
        } = user;

        /** This is what goes in our JWT */
        const payload = {
          id,
          firstname,
          lastname,
          email,
          role,
          isVerified
        };

        /** assigns payload to req.user */
        req.login(payload, { session: false }, () => res.status(200).json({
          status: 200,
          message: 'user successfully Sign In',
          data: {
            token: TokenHelper.generateToken(payload),
            user: {
              firstname,
              lastname,
              email,
              role,
              isVerified
            }
          }
        }));
      },
    )(req, res);
  }
}

export default AuthController;
