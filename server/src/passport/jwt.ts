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

    return res.status(400).send({ error: error, message: 'jwt login fail' });
  })(req, res, next);
};

const { Strategy: JWTStrategy } = passportOfJwt;

const cookieExtractor = req => {
  let token;
  if (req && req.headers.authorization) token = req.headers.authorization;
  return token;
};

const JWTConfig: passportOfJwt.StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.PRIVATE_TOKEN_KEY,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    const [users] = await User.findAllWhere(jwtPayload.STUDENT_ID);
    const user = users[0];
    if (user) return done(null, user);
    return done(null, false, { reason: '올바르지 않은 인증정보입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

export default new JWTStrategy(JWTConfig, JWTVerify);
