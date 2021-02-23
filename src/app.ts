import express, { Request, Response } from 'express';
import routers from './routers';
import passport from 'passport';
import passportInit from './passport';
import dotenv from 'dotenv';
import path from 'path';

import { expressMiddleware, thirdPartyMiddleware } from './middlewares';

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(expressMiddleware);
app.use(thirdPartyMiddleware);

passportInit();

app.use('/api', routers);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

export default app;
