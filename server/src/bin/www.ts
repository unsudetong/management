import app from '../app';
import { createServer } from 'http';

const port: number = Number(process.env.PORT) || 3000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`port ${port} is ready...`);
});

import greenLock from 'greenlock-express';
greenLock
  .init({
    packageRoot: __dirname + '/../../',
    configDir: './greenlock.d',
    maintainerEmail: 'kscodebase@gmail.com',
    cluster: false,
  })
  .serve(app);
