import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';

import dotenv from 'dotenv';
import admins from '../models/admin';

dotenv.config();

const corsOption = {
  // origin: /\.luckydata\.site$/,
  origin: true,
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};

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

export const adminCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const user: any = req.user;
  const [isAdmin]: any = await admins.findAllWhere(user.USER_ID);
  if (!isAdmin.length) {
    res.sendStatus(401);
  }
  next();
};
