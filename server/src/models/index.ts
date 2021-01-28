import { Sequelize } from 'sequelize';
import config from '../config/database';

import user from './user';
import admin from './admin';
import article from './article';
import project from './project';
import track from './track';
import projectArticle from './projectArticle';
import userTrack from './userTrack';

const env = process.env.NODE_ENV || 'development';
const CURRENT_STATE: any = config['development'];
console.log('CURRENT_STATE : ', CURRENT_STATE);

const sequelize = new Sequelize(
  CURRENT_STATE.database,
  CURRENT_STATE.username,
  CURRENT_STATE.password,
  CURRENT_STATE,
);

const database: any = { sequelize: sequelize, Sequelize: Sequelize };

database.track = track(sequelize, Sequelize);
database.user = user(sequelize, Sequelize);
database.userTrack = userTrack(sequelize, Sequelize);
database.admin = admin(sequelize, Sequelize);
database.project = project(sequelize, Sequelize);
database.article = article(sequelize, Sequelize);
database.projectArticle = projectArticle(sequelize, Sequelize);

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

export default database;
