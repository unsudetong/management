import app from '../app';
import { createServer } from 'http';

const port: number = Number(process.env.PORT) || 4000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`port ${port} is ready...`);
});
