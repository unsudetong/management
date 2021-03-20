import dotenv from 'dotenv';
import { Admin } from '../../admin/entities/admin.entity';
import { Article } from '../../article/entities/article.entity';
import { Project } from '../../project/entities/project.entity';
import { Track } from '../../track/entities/track.entity';
import { User } from '../../user/entities/user.entity';
dotenv.config();

export const database: any = {
  development: {
    type: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    entities: [User, Admin, Track, Project, Article],
    synchronize: true,
  },
  production: {
    type: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    entities: [User, Admin, Track, Project, Article],
    synchronize: false,
  },
};
