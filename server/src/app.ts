import express, { Request, NextFunction, Response } from 'express';
import routers from './routers';
import passport from 'passport';
import passportInit from './passport';
import dotenv from 'dotenv';

import { expressMiddleware, thirdPartyMiddleware } from './middlewares';

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(expressMiddleware);
app.use(thirdPartyMiddleware);

passportInit();

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.append('Access-Control-Allow-Credentials', 'true');
  console.log(res.getHeaders());
  next();
});

app.use('/', routers);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

export default app;
