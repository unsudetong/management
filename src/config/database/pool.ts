import mysql from 'mysql2/promise';
import { PoolOptions } from 'mysql2/typings/mysql';
import dotenv from 'dotenv';

dotenv.config();

const option: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  connectionLimit: 8,
  database: process.env.DB_NAME,
  multipleStatements: true,
  typeCast: function (field, next) {
    if (field.type == 'VAR_STRING') {
      return field.string();
    }
    return next();
  },
};

const pool = mysql.createPool(option);

export default pool;
