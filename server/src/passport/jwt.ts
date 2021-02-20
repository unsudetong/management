import { Request, Response, NextFunction } from 'express';
import passportOfJwt from 'passport-jwt';
import passport from 'passport';
import User from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

export const isAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('jwt', (error, user) => {
    if (user) {
      req.user = user;
      return next();
    }

    return res.status(400).json({ error: error, message: 'jwt login fail' });
  })(req, res, next);
};

const { ExtractJwt, Strategy: JWTStrategy } = passportOfJwt;

const JWTConfig: passportOfJwt.StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.PRIVATE_TOKEN_KEY,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    const [users] = await User.findAllWhere(jwtPayload.USER_ID);
    const user = users[0];
    if (user) return done(null, user);
    return done(null, false, { reason: '올바르지 않은 인증정보입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

export default new JWTStrategy(JWTConfig, JWTVerify);
