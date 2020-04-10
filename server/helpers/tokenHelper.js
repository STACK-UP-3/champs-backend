import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * This class contains.
 * two methods, one to help decode token.
 * and the second to gerate token.
 */
class TokenHelper {
  /**
   * This method creates token used to confirm email.
   * @param {object} data the object that contain the data that is embedded with token.
   * @returns {String}  token created .
   */
  static async createToken(data) {
    try {
      const token = jwt.sign(
        data, process.env.SECRET_KEY,
        { expiresIn: '2h' }
      );
      return token;
    } catch (error) {
      return error;
    }
  }
}
export default TokenHelper;
