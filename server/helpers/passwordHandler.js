import bcrypt from 'bcrypt';

/**
 * This class contains
 * two methods, one to help hashing password
 * and the second to retrieve hashed password
 */
class Hasher {
  /**
   * Retrieve hashed the password.
   * @param {string} plainPassword The user's password to be checked.
   * @param {string} hashedPassword The user's password to be compared.
   * @returns {boolean} Status if it's the same password or not.
   */
  static checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export default Hasher;
