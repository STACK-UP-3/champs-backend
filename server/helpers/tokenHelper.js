import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { SECRET_KEY } = process.env;
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
   * This method verifies and decodes the token sent.
   * @param {String} token the string that contain a token.
   * @returns {object}  some data of the created user from database.
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
