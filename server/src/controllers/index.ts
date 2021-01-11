import express from 'express';
import github from '../passport/github';

const router = express.Router();

router.use(github.initialize());
router.use(github.session());

const checkUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log('req.session.id : ', req.session.id);

  if (!req.session.id) {
    console.log('로그인되지 않은 유저입니다.');
    return res.redirect('/auth/github');
  }
  next();
};

router.get(
  '/auth/github',
  checkUser,
  github.authenticate('github', { scope: ['user:email'] }),
);

router.get(
  '/auth/github/callback',
  checkUser,
  github.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/'),
);

router.get('/logout', function (req: any, res) {
  req.logout();
  res.redirect('/');
});

export default router;
