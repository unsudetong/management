import passport from 'passport';
import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import { github, githubFailure, githubLoginFail } from '../../controllers/auth';
import dotenv from 'dotenv';
import oAuth from '../../config/passport';
import axios from 'axios';
import QueryString from 'qs';
import User from '../../models/user';
dotenv.config();

let userToken: any = '';

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

router.get('/', (req, res, next) => {
  res.send({ token: userToken });
});

router.post('/github', async (req, res, next) => {
  const { code } = req.body;
  const client_id = oAuth.github.clientID;
  const client_secret = oAuth.github.clientSecret;

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log(code, client_id, client_secret);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

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

    console.log('response : ', response);

    const token = response.data.access_token;

    console.log('response token : ', token);

    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    console.log('data : ', data);

    const [users]: any = await User.oAuthLogin(data.id);
    let user = users && users.length && users[0];

    if (!user) {
      const [newUser] = await User.create({
        NAME: data.id,
        OAUTH_ID: data.id,
        USER_ID: data.id,
        PASSWORD: data.id,
      });
      user = newUser;
    }

    const access_token = jwt.sign(
      {
        USER_ID: user.USER_ID,
        NAME: user.NAME,
        DATE: Date.now(),
      },
      process.env.PRIVATE_TOKEN_KEY,
    );

    console.log('access_token : ', access_token);

    return res.json({ access_token });
  } catch (error) {
    // console.error(error);
    throw new Error(error);
  }
});

// router.get(
//   '/github',
//   (req, res, next) => {
//     res.setHeader('access-control-allow-origin', 'true');
//     res.setHeader('access-control-allow-credentials', 'true');
//     console.log(res.getHeader('access-control-allow-origin'));
//     next();
//   },
//   github,
// );

// router.get('/github/callback', githubFailure, (req: Request, res: Response) => {
//   const user: any = req.user;
//   const token = jwt.sign(
//     {
//       USER_ID: user.USER_ID,
//       NAME: user.NAME,
//       DATE: Date.now(),
//     },
//     process.env.PRIVATE_TOKEN_KEY,
//   );

//   res.append('Set-Cookie', `token1=${token}; Path=/;`);
//   res.append('Set-Cookie', `token2=${token}; Domain=luckydata.site; Path=/;`);
//   res.append('Set-Cookie', `token3=${token}; Domain=.luckydata.site; Path=/;`);
//   res.append(
//     'Set-Cookie',
//     `token4=${token}; Domain=www.luckydata.site; Path=/;`,
//   );
//   console.log(res.getHeaders());
//   res.redirect(oAuth.github.URLafterLogin);
// });

// router.get('/github/loginFail', githubLoginFail, (req, res) => {
//   res.redirect(oAuth.callbackURL);
// });

export default router;
