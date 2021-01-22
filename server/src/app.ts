import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import controllers from './routers';
import sequelize from './models';

import passport from 'passport';
import jwt from 'jsonwebtoken';

import passportInit from './passport';

import dotenv from 'dotenv';
dotenv.config();

const isAuthenticate = (req, res, next, err) => {
  // console.log('req.user : ', req.user);
  if (!req.user) {
    // console.log('user is not!');
    next(err);
  }

  // console.log('user is found!');
  next();
};

passportInit();

sequelize.user.sync();
sequelize.admin.sync();
sequelize.article.sync();
sequelize.project.sync();
sequelize.track.sync();
sequelize.projectArticle.sync();

const app: express.Application = express();

app.use(passport.initialize());

app.use([logger('dev'), cookieParser()]);
app.use([compression(), helmet(), cors()]);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // User.findOne({ _id: id }, function (err, user) {
  // done(err, user);
  // });
  done(null, id);
});

app.use('/', controllers);

app.post(
  '/auth',
  isAuthenticate,
  (req: express.Request, res: express.Response, next) => {
    passport.authenticate('jwt', (error, user) => {
      if (user) {
        req.user = user;
        return res.status(200).send({ user: user });
      }
      return res.status(400).send({ error: error, message: 'jwt login fail' });
    })(req, res, next);
  },
);

app.post('/auth/local', [
  isAuthenticate,
  async (req, res: express.Response, next) => {
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
              PASSWORD: user.PASSWORD,
            },
            process.env.PRIVATE_TOKEN_KEY,
          );

          res.append('Authorization', token); //, { maxAge: 900000, httpOnly: true });
          res.status(200).json({ message: 'success', result: token });
        });
      })(req, res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
]);

export default app;
