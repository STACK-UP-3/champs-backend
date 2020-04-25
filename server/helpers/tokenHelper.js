import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const { SECRET_KEY } = process.env;

/**
 * This class contains
 * methods for handling token-related operations.
 */
class TokenHelper {
  /**
   * This method generates a token.
   * @param {object} data information to be stored in the token.
   * @returns {String} generated token.
   */
  static async generateToken(data) {
    try {
      const token = await jwt.sign(
        data, SECRET_KEY,
        { expiresIn: '2h' }
      );
      return token;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method verifies and decodes a sent token.
   * @param {String} token a sent token.
   * @returns {object} some data of the created user from database.
   */
  static verifyToken(token) {
    try {
      const data = jwt.verify(token, SECRET_KEY);
      return data;
    } catch (err) {
      return err;
    }
  }
}
export default TokenHelper;
