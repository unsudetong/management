import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

const corsOption = {
  // origin: /\.luckydata\.site$/,
  origin: true,
  // methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true,
  // allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};
console.log(1234567);
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
  cors(corsOption),
];
