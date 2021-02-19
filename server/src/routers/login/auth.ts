import passport from 'passport';
import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import { github, githubFailure, githubLoginFail } from '../../controllers/auth';
import dotenv from 'dotenv';
import oAuth from '../../config/passport';
dotenv.config();

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (error, user) => {
    if (user) {
      req.user = user;
      return res.status(200).json({ user: user });
    }
    return res.status(400).json({ error: error, message: 'jwt login fail' });
  })(req, res, next);
});

router.post('/local', (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('local', (passportError, user, info) => {
      if (passportError || !user) {
        res.status(400).json({ message: '로그인에 실패하였습니다.' });
        return;
      }

      req.login(user, { session: false }, loginError => {
        if (loginError) {
          return res.json('loginError');
        }

        const token = jwt.sign(
          {
            USER_ID: user.USER_ID,
            NAME: user.NAME,
            DATE: Date.now(),
          },
          process.env.PRIVATE_TOKEN_KEY,
        );

        res.status(200).json({
          message: 'success',
          result: token,
        });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', (req, res, next) => {
  res.send({ message: 'ok' });
});

router.get('/github', github);

router.get('/github/callback', githubFailure, (req: Request, res: Response) => {
  const user: any = req.user;
  const token = jwt.sign(
    {
      USER_ID: user.USER_ID,
      NAME: user.NAME,
      DATE: Date.now(),
    },
    process.env.PRIVATE_TOKEN_KEY,
  );

  // res.cookie('token', token);
  res.setHeader('authorization', token);
  res.redirect(oAuth.callbackURL);
});

router.get('/github/loginFail', githubLoginFail, (req, res) => {
  res.redirect(oAuth.callbackURL);
});

export default router;
