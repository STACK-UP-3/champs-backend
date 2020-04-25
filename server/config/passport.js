import passport from 'passport';
import passportLo from 'passport-local';
import AuthHelper from '../helpers/authHelper';

const LocalStrategy = passportLo.Strategy;

const passportConfig = () => {
  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => AuthHelper.signInLocal(email, password, done)
  ));
};

export default passportConfig;
