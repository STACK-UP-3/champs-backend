import PasswordHasher from './passwordHashHelper';
import UserHelper from './UserHelper';

/**
 * This class contains
 * one method to help checking id user exists and has valid password
 */
class CheckPoint {
  /**
     * Retrieve hashed the password.
     * @param {string} email The user's email to be checked.
     * @param {string} password The user's password to be compared.
     * @param {string} done function supplying user credentials after user is successfully checked.
     * @returns {boolean} message or User details after passing all checks.
     */
  static async signInLocal(email, password, done) {
    const data = { email };

    const user = await UserHelper.findUser(data);
    if (user) {
      if (user.isVerified === false) return done('Please confirm your email before logging in!');

      const passwordExist = await PasswordHasher
        .checkPassword(password, user.password);
      if (passwordExist) return done(null, user);
    }
    return done('password or email is incorrect');
  }
}
export default CheckPoint;
