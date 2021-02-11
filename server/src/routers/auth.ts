import passport from 'passport';
import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (error, user) => {
    if (user) {
      req.user = user;
      return res.status(200).send({ user: user });
    }
    return res.status(400).send({ error: error, message: 'jwt login fail' });
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
          return res.send('loginError');
        }

        const token = jwt.sign(
          {
            STUDENT_ID: user.STUDENT_ID,
            NAME: user.NAME,
            DATE: Date.now(),
          },
          process.env.PRIVATE_TOKEN_KEY,
        );

        res.status(200).send({
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

export default router;
