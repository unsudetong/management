import Model from './model';
import pool from '../config/database/pool';

const GET_QUERY = 'SELECT * FROM ARTICLES';
const GET_QUERY_WHERE = term => GET_QUERY + ` WHERE ID = ${term} LIMIT 1`;
const POST_QUERY = `INSERT INTO ARTICLES SET ?`;
const DELETE_QUERY = ID => `DELETE FROM ARTICLES WHERE ID = ${ID}`;
const EDIT_QUERY = (ID, CONTENTS, TITLE) =>
  `UPDATE ARTICLES SET TITLE='${TITLE}', CONTENTS='${CONTENTS}' WHERE ID = ${ID}`;

https: class Article extends Model {
  constructor() {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
  }

  async editContents(value) {
    const ID = value.ID;
    const CONTENTS = value.CONTENTS;
    const TITLE = value.TITLE;

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      return conn.query(EDIT_QUERY(ID, CONTENTS, TITLE));
    } catch (error) {
      conn.rollback();
      console.error(error);
      throw new Error();
    } finally {
      conn.release();
    }
  }
}

export default new Article();
