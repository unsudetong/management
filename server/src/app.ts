import express from 'express';
import controllers from './controllers';

const app: express.Application = express();

app.use('/', controllers);

export default app;
