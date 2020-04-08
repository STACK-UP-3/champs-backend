import passport from 'passport';
import passportLo from 'passport-local';

import VerifyUser from '../helpers/verifyUser';

const LocalStrategy = passportLo.Strategy;


const passportConfig = () => {
  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => VerifyUser.inSignIn(email, password, done)
  ));
};

export default passportConfig;
