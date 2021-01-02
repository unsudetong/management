import express from 'express';
import github from './passport/github';

const app: express.Application = express();

app.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('hello typescript express!');
  },
);

app.get(
  '/auth/github',
  github.authenticate('github', { scope: ['user:email'] }),
);

app.get(
  '/auth/github/callback',
  github.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/'),
);

export default app;
