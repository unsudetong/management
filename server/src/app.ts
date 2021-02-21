import express, { Request, NextFunction, Response } from 'express';
import routers from './routers';
import passport from 'passport';
import passportInit from './passport';
import dotenv from 'dotenv';

import { expressMiddleware, thirdPartyMiddleware } from './middlewares';

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(expressMiddleware);
app.use(thirdPartyMiddleware);

passportInit();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  );
  next();
});

app.use('/', routers);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

export default app;
