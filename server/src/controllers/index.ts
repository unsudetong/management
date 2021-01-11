import express from 'express';
import github from '../passport/github';

const router = express.Router();
router.use(github.initialize());
router.use(github.session());

router.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Server is listening...');
  },
);

router.get(
  '/auth/github',
  github.authenticate('github', { scope: ['user:email'] }),
);
router.get(
  '/auth/github/callback',
  github.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/'),
);

router.get('/logout', function (req: any, res) {
  req.logout();
  res.redirect('/');
});

export default router;
