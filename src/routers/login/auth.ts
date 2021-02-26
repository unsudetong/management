import passport from 'passport';
import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import oAuth from '../../config/passport';
import bcrypt from 'bcrypt';
import axios from 'axios';
import User from '../../models/user';
dotenv.config();

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (error, user) => {
    if (user) {
      req.user = user;
      return res.status(200).json({ user: user });
    }
    return res.status(400).json({ error: error, message: 'jwt login fail' });
  })(req, res, next);
});

router.post('/local', (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('local', (passportError, user, info) => {
      if (passportError || !user) {
        res.status(400).json({ message: '로그인에 실패하였습니다.' });
        return;
      }

      req.login(user, { session: false }, loginError => {
        if (loginError) {
          return res.json('loginError');
        }

        const token = jwt.sign(
          {
            USER_ID: user.USER_ID,
            NAME: user.NAME,
            DATE: Date.now(),
          },
          process.env.PRIVATE_TOKEN_KEY,
        );

        res.status(200).json({
          message: 'success',
          result: token,
        });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/github', async (req, res, next) => {
  const { code } = req.body;
  const client_id = oAuth.github.clientID;
  const client_secret = oAuth.github.clientSecret;

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        code,
        client_id,
        client_secret,
      },
      {
        headers: {
          accept: 'application/json',
        },
      },
    );

    const token = response.data.access_token;
    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const [users]: any = await User.oAuthLogin(data);
    let user = users && users.length && users[0];
    console.log(data);
    console.log(data.id);
    if (!user) {
      const hashPassword = await bcrypt.hash(String(data.id), 12);
      await User.create({
        NAME: data.name,
        OAUTH_ID: data.id,
        USER_ID: data.id,
        PASSWORD: hashPassword,
      });

      res.json({
        access_token: jwt.sign(
          {
            USER_ID: data.id,
            NAME: data.id,
            DATE: Date.now(),
          },
          process.env.PRIVATE_TOKEN_KEY,
        ),
      });
    }

    const access_token = jwt.sign(
      {
        USER_ID: user.USER_ID,
        NAME: user.NAME,
        DATE: Date.now(),
      },
      process.env.PRIVATE_TOKEN_KEY,
    );

    return res.json({ access_token });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

export default router;
