import passport from 'passport';
import local from './local';
import jwt from './jwt';
import github from './github';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default () => {
  passport.use('local', local);
  passport.use('jwt', jwt);
  passport.use('github', github);
  passport.initialize();
};
