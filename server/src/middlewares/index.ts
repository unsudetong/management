import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';

import dotenv from 'dotenv';

dotenv.config();

const corsOption = {
  origin: /\.luckydata\.site$/,
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};

export const expressMiddleware = [
  session({
    secret: 'test',
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: false,
      secure: false,
    },
  }),
  express.json(),
  express.urlencoded({ extended: false }),
];

export const thirdPartyMiddleware = [
  logger('dev'),
  cookieParser(),
  compression(),
  helmet(),
  passport.initialize(),
  cors(corsOption),
];
