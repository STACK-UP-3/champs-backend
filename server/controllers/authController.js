import passport from 'passport';
import AuthHelper from '../helpers/authHelper';
import UserHelper from '../helpers/userHelper';
import TokenHelper from '../helpers/tokenHelper';
import passwordHelper from '../helpers/passwordHelper';

/**
 * This class contains all methods
 * required to handle all
 * authentication operations.
 */
class AuthController {
  /**
   * This method handles the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async signUp(req, res) {
    try {
      const {
        lastname, firstname, email, username, password, confirmPassword
      } = req.body;
      if (password !== confirmPassword) {
        return res.status(400).json({
          status: 400,
          message: 'The passwords must match.',
        });
      }
      const role = 'Requester';
      const hashedPassword = passwordHelper.hashPassword(password);
      const data = {
        lastname,
        firstname,
        email,
        username,
        role,
        password: hashedPassword,
        confirmPassword,
        authType: 'local',
        isVerified: false
      };
      const user = await UserHelper.registerUser(data);
      if (user) {
        const token = await TokenHelper.generateToken({
          id: user.id,
          email,
          username
        });
        await AuthHelper.sendMail(email, token);
        res.status(201).send({
          status: 201,
          message: 'Account has been created successfully. Check your email for a verification link.'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when registering the user',
        error: error.message
      });
    }
  }

  /**
   *  This method handles the email verification operation.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async verifyEmail(req, res) {
    const { token } = req.params;
    const { id } = await TokenHelper.verifyToken(token);
    try {
      if (id) {
        AuthHelper.verifyUserEmail(id);
        res.redirect('https://champs-frontend.herokuapp.com/verify-email');
      } else {
        res.status(400).send({
          status: 400,
          message: 'invalid token'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying email',
        error: error.message
      });
    }
  }

  /**
     * This method handles the sign request.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user.
     */
  static async signIn(req, res) {
    try {
      passport.authenticate(
        'local',
        { session: false },
        async (error, user) => {
          if (error || !user) {
            return res.status(404).json({ error });
          }
          const {
            id, firstname, lastname, email, role, lineManager, username, isVerified
          } = user;

          // This is what is stored in token
          const payload = {
            id,
            firstname,
            lastname,
            email,
            username,
            role,
            lineManager,
            isVerified
          };
          const token = await TokenHelper.generateToken(payload);

          // Returning the token and some user information
          req.login(payload, { session: false }, () => res.status(200).json({
            status: 200,
            message: 'User signed in successfully',
            data: {
              token,
              user: {
                firstname,
                lastname,
                email,
                username,
                role,
                isVerified
              }
            }
          }));
        },
      )(req, res);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when signing in',
        error: error.message
      });
    }
  }

  /**
     * This method handles Social Sign In request.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @returns {object} The status and some data of the user.
     */
  static async socialSignIn(req, res) {
    try {
      const {
        id, username, firstname, lastname, email, role, authType, isVerified, lineManager
      } = req.user;

      const token = await TokenHelper.generateToken({
        id,
        username,
        firstname,
        lastname,
        lineManager,
        authType,
        email,
        role,
        isVerified
      });

      res.redirect(`http://localhost:8080/home?${token}`);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when signing in with the social platform',
        error: error.message
      });
    }
  }
}

export default AuthController;
