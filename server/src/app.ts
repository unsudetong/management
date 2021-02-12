import express, { Response } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import routers from './routers';

import passport from 'passport';

import passportInit from './passport';

import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use([logger('dev'), cookieParser()]);
app.use([compression(), helmet(), cors()]);

passportInit();

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use('/', routers);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

export default app;
