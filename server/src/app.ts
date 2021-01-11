import express from 'express';
import controllers from './controllers';
import session from 'express-session';

const app: express.Application = express();

app.use(
  session({
    secret: 'key',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use('/', (req, res, next) => {
  console.log('do you have session? : ', req.session.id);
  next();
});

app.use('/', controllers);

export default app;
