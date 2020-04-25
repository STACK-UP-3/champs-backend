import bcrypt from 'bcrypt';

/**
 * This class contains methods
 *  handling password-related operations
 */
class PasswordHelper {
  /**
     * This method hashes a password.
     * @param {string} password The user's password.
     * @returns {string} The users's hashed password.
     */
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * This method compares passwords.
   * @param {string} plainPassword The user's password to be compared.
   * @param {string} hashedPassword The user's password to compare to.
   * @returns {boolean} Status if it's the same password or not.
   */
  static comparePasswords(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export default PasswordHelper;
