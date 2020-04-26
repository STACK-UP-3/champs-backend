import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AuthHelper from '../helpers/authHelper';

const {
  GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET, SITE_URL
} = process.env;

// This function configures passport strategies for authentication
const passportConfig = () => {
  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => AuthHelper.localSignIn(email, password, done)
  ));

  passport.use(new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: `${SITE_URL}/api/v1/auth/google/return`,
      googleFields: ['emails', 'firstName', 'lastName'],
    },
    // aT: access token, rT: refresh token
    async (aT, rT, profile, done) => AuthHelper.socialSignIn(aT, rT, profile, done)
  ));

  passport.use(new FacebookStrategy(
    {
      clientID: FACEBOOK_ID,
      clientSecret: FACEBOOK_SECRET,
      callbackURL: `${SITE_URL}/api/v1/auth/facebook/return`,
      profileFields: ['id', 'displayName', 'first_name', 'last_name', 'email', 'photos'],
    },
    // aT: access token, rT: refresh token
    async (aT, rT, profile, done) => AuthHelper.socialSignIn(aT, rT, profile, done)
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};

export default passportConfig;
