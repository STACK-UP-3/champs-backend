import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { JWT_EXPIRES_MS } = process.env;

/**
 * This class contains.
 * two methods, one to help decode token.
 * and the second to gerate token.
 */
class TokenHelper {
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
  static generateToken(id, firstname, lastname, email, role, isVerified) {
    const generatedToken = jwt.sign({
      id,
      firstname,
      lastname,
      email,
      role,
      isVerified,
      expires: Date.now() + parseInt(JWT_EXPIRES_MS, 4),
    }, process.env.SECRET_KEY);
    return generatedToken;
  }
}
export default TokenHelper;
