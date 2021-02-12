import app from '../app';
import { createServer } from 'http';

// import sequelize from '../sequelize_models';

// (async () => {
//   await sequelize.track.sync();
//   await sequelize.user.sync();
//   await sequelize.userTrack.sync();
//   await sequelize.admin.sync();
//   await sequelize.project.sync();
//   await sequelize.article.sync();
// })();

const port: number = Number(process.env.PORT) || 3000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`port ${port} is ready...`);
});
