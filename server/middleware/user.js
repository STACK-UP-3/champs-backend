import passport from 'passport';
import UserHelper from '../helpers/userHelper';
import TokenHelper from '../helpers/tokenHelper';

/**
 * This class contains methods
 * for authorizing user-related operations
 */
class User {
  /**
   * This method verifies whether email is used.
   * @param {object} req the user's request.
   * @param {object} res the response.
   * @param {Function} next pass to next function.
   * @returns {object} message indicating used email.
   */
  static async verifyUsedEmail(req, res, next) {
    try {
      const { email } = req.body;
      const usedEmail = await UserHelper.findUser({ email });
      if (usedEmail === null) {
        next();
      } else {
        res.status(409).send({
          status: 409,
          message: 'The specified email is already taken'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong while verifying used email',
        error: error.message
      });
    }
  }

  /**
   * This method verifies whether email is registered.
   * @param {object} req the user's request.
   * @param {object} res the response.
   * @param {Function} next pass to next function.
   * @returns {object} message indicating used email.
   */
  static async verifyRegisteredEmail(req, res, next) {
    try {
      const { email } = req.body;
      const registeredEmail = await UserHelper.findUser({ email });
      if (registeredEmail === null) {
        res.status(404).send({
          status: 404,
          message: 'Email is not registered in our system.'
        });
      } else if (registeredEmail.dataValues.isVerified === true) {
        next();
      } else {
        res.status(400).send({
          status: 400,
          message: 'You should verify your email before you reset the password.'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong while resetting your password.',
        error: error.message
      });
    }
  }


  /**
   * This method verifies whether username is used.
   * @param {object} req the user's request.
   * @param {object} res the response.
   * @param {Function} next pass to next function
   * @returns {object} message indicating used username.
   */
  static async verifyUsedUsername(req, res, next) {
    try {
      const { username } = req.body;
      const user = await UserHelper.findUser({ username });
      if (user === null || username === undefined) {
        next();
      } else {
        res.status(409).send({
          status: 409,
          message: 'The specified username is already taken'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying used username',
        error: error.message
      });
    }
  }

  /**
   * This method verifies profile owner.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} message indicating an error.
   */
  static async verifyProfileOwner(req, res, next) {
    const { username } = req.params;
    const { token } = req.headers;
    try {
      const user = await UserHelper.findUser({ username });
      const data = TokenHelper.verifyToken(token);
      if (user !== null) {
        if (data.username === username || data.id === user.id) {
          next();
        } else {
          res.status(401).send({
            status: 401,
            message: "You don't have permission to access the specified user profile",
          });
        }
      } else {
        res.status(404).send({
          status: 404,
          message: "The specified username doesn't exist",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying profile owner',
        error: error.message
      });
    }
  }


  /**
   * This method verifies user role.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} message indicating an error.
   */
  static async verifyRole(req, res, next) {
    try {
      if (req.user.role === 'Super Administrator') {
        return next();
      }
      return res.status(401).json({
        status: 401,
        error: 'Sorry! you don\'t have the permission'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying user role',
        error: error.message
      });
    }
  }

  /**
   * This method verifies authentication with google.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} The status and some data of the user.
   */
  static async verifyGoogleSignIn(req, res, next) {
    try {
      passport.authenticate('google', { failureRedirect: 'https://champs-frontend.herokuapp.com/signin', session: false }, (err, user) => {
        if (err) { return next(err); }
        req.user = user;
        return next();
      })(req, res, next);
    } catch (error) {
      return error;
    }
  }

  /**
     * This method verifies authentication with facebook.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @param {Function} next pass to next function
     * @returns {object} The status and some data of the user.
     */
  static async verifyFacebookSignIn(req, res, next) {
    try {
      passport.authenticate('facebook', { failureRedirect: 'https://champs-frontend.herokuapp.com/signin', session: false }, (err, user) => {
        if (err) { return next(err); }
        req.user = user;
        return next();
      })(req, res, next);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when authentication with the social platform',
        error: error.message
      });
    }
  }

  /**
   * This method verifies the manager role of signed in user.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {Function} next pass to next function
   * @returns {object} message indicating an error.
   */
  static async verifyManagerRole(req, res, next) {
    try {
      if (req.user.role === 'Manager') {
        return next();
      }
      return res.status(401).json({
        status: 401,
        error: 'Sorry! you don\'t have the permission to accept or reject a trip request'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when verifying user role',
        error: error.message
      });
    }
  }
}

export default User;
