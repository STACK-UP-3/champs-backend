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
   * token decoding.
   * @param {string} token The user's token.
   * @param {string} secrectKey The secret key.
   * @returns {string} The users's hashed password.
   */
  static decodeToken(token, secrectKey) {
    const isToken = jwt.verify(token, secrectKey);
    return isToken;
  }

  /**
   * Generating a token.
   * @param {integer} id The user's id.
   * @param {string} firstname The user's username.
   * @param {string} lastname The user's username.
   * @param {string} email The user's email.
   * @param {string} role The user's role.
   * @param {string} isVerified The user's isVerified.
   * @returns {string} The users's hashed password.
   */
  static generateToken({
    id, firstname, lastname, email, role, isVerified
  }) {
    const generatedToken = jwt.sign({
      id, firstname, lastname, email, role, isVerified
    }, process.env.SECRET_KEY);
    return generatedToken;
  }
}
export default TokenHelper;
