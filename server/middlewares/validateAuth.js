import jwt from 'jsonwebtoken';
import { signupSchema, signinSchema, resetSchema } from '../schemas/authSchema';

/**
 * This class contains all methods
 * required to validate
 * sent data from the UI.
 */
class validateAuth {
  /**
   * This method validates the data sent from the UI.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} The error and some error messages .
   */
  static validateSignup(req, res, next) {
    const { error } = signupSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        message
      });
    }
  }

  /**
   * This method handle the signin request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next pass to next method.
   * @returns {object} The error and some error messages .
   */
  static validateSignIn(req, res, next) {
    const { error } = signinSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        message
      });
    }
  }

  /**
     * This method handles password validation.
     * @param {object} req The user's request.
     * @param {object} res The response.
     * @param {object} next pass to next method.
     * @returns {object} The error and some error messages .
     */
  static validateResetPassword(req, res, next) {
    const { error } = resetSchema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({
        status: 422,
        error: message
      });
    }
  }

  /**
       * This method handles token validations.
       * @param {object} req The user's request.
       * @param {object} res The response.
       * @param {object} next pass to next method.
       * @returns {object} The error and some error messages .
       */
  static async validateToken(req, res, next) {
    const { token } = req.params;
    jwt.verify(token, process.env.SECRET_KEY, async (error) => {
      if (error) {
        return res.status(403).json({ error: `${error.message}` });
      }
      return next();
    });
  }
}
export default validateAuth;
