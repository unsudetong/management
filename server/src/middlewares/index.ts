import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';

import dotenv from 'dotenv';
dotenv.config();

export const expressMiddleware = [
  express.json(),
  express.urlencoded({ extended: false }),
];

export const thirdPartyMiddleware = [
  logger('dev'),
  cookieParser(),
  compression(),
  helmet(),
  passport.initialize(),
];
