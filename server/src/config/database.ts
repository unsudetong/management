import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  },
  production: {},
};

export default config;
