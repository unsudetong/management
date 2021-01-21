import passport from 'passport';
import local from './local';
import jwt from './jwt';

export default () => {
  passport.use('local', local);
  passport.use('jwt', jwt);
  passport.initialize();
};
