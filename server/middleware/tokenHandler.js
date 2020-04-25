import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../sequelize/models';

const { User } = models;

dotenv.config();

/**
 * This class contains
 * methods for handling token-related operations.
 */
class TokenHandler {
  /**
     * This method verifies a token.
     * @param {object} req the user's request.
     * @param {object} res the response.
     * @param {object} next pass to next method.
     * @returns {object} error message.
     */
  static verifyToken(req, res, next) {
    const token = req.headers.token || req.params.token;
    if (!token) {
      res.status(401).json({ error: 'Please log in or Register' });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
          return res.status(403).json({ error: `${error.message}` });
        }
        const userExists = await User.findOne({
          where: { email: decoded.email }
        });
        if (userExists) {
          req.user = userExists;
          return next();
        }
        return res.status(401).json({ status: 401, error: 'User not recognized. Please register and try again.' });
      });
    }
  }
}

export default TokenHandler;
