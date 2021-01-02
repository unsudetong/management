import app from '../app.js';
import { createServer } from 'http';

const port: number = Number(process.env.PORT) || 3000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`port ${port} is ready...`);
});

export default server;
