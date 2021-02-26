import passport from 'passport';
import local from './local';
import jwt from './jwt';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default () => {
  passport.use('local', local);
  passport.use('jwt', jwt);
  passport.initialize();
};
