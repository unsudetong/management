import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import controllers from './routers';

import passport from 'passport';
import jwt from 'jsonwebtoken';

import passportInit from './passport';

import dotenv from 'dotenv';

dotenv.config();

const isAuthenticate = (req, res: express.Response, next) => {
  passport.authenticate('jwt', (error, user) => {
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(400).send({ error: error, message: 'jwt login fail' });
  })(req, res, next);
};

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use([logger('dev'), cookieParser()]);
app.use([compression(), helmet(), cors()]);

passportInit();

app.post('/auth', (req: express.Request, res: express.Response, next) => {
  passport.authenticate('jwt', (error, user) => {
    if (user) {
      req.user = user;
      return res.status(200).send({ user: user });
    }
    return res.status(400).send({ error: error, message: 'jwt login fail' });
  })(req, res, next);
});

app.post('/auth/local', (req, res: express.Response, next) => {
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

        res.append('Authorization', token);
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

// app.use('/', isAuthenticate, controllers);
app.use('/', controllers);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

export default app;
