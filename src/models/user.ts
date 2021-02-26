import Model from './model';
import pool from '../config/database/pool';

const GET_QUERY = 'SELECT * FROM USERS';
const GET_QUERY_WHERE = term => GET_QUERY + ` WHERE USER_ID = "${term}"`;
const POST_QUERY = `INSERT INTO USERS SET ?`;
const DELETE_QUERY = ID => `DELETE FROM USERS WHERE ID = ${ID}`;
const OAUTH_QUERY = OAUTH_ID =>
  GET_QUERY + ` WHERE USER_ID = ${OAUTH_ID} LIMIT 1`;

class User extends Model {
  OUATH_QUERY: (string) => string;

  constructor(OAUTH_QUERY) {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
    OAUTH_QUERY = OAUTH_QUERY;
  }

  async oAuthLogin(value) {
    const githubUserID = value.id;
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      return conn.query(OAUTH_QUERY(githubUserID));
    } catch (error) {
      conn.rollback();
      console.error(error);
      throw new Error('GET METHOD ERROR');
    } finally {
      conn.release();
    }
  }
}

export default new User(OAUTH_QUERY);
