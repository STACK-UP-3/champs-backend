import passport from 'passport';
import passportLo from 'passport-local';

import CheckPoint from '../helpers/checkPoints';

const LocalStrategy = passportLo.Strategy;


const passportConfig = () => {
  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => CheckPoint.signInLocal(email, password, done)
  ));
};

export default passportConfig;
