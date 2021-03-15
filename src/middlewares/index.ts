import express, { NextFunction, request, Request, Response } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';
import admins from '../models/admin';
import dotenv from 'dotenv';
dotenv.config();

const corsOption = {
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
  const [isAdmin]: any = await admins.findAllWhere(user.ID);
  if (!isAdmin.length) {
    res.sendStatus(401);
  }
  next();
};
