import Model from './model';
import pool from '../config/pool';

const GET_QUERY = 'SELECT * FROM USER_TRACKS';
const GET_QUERY_WHERE = term => GET_QUERY + ` WHERE USER_ID = ${term} LIMIT 1`;
const POST_QUERY = `INSERT INTO USER_TRACKS SET ?`;
const DELETE_QUERY = ID => `DELETE FROM USER_TRACKS WHERE ID = ${ID}`;

const TRACK_PAGE_SQL = TRACK_ID =>
  `SELECT A.ID AS ARTICLE_ID, A.TITLE AS ARTICLE_TITLE, T.ID AS TRACK_ID, P.ID AS PROJECT_ID, P.TITLE AS PROJECT_TITLE, P.WRITER AS PROJECT_WRITER 
  FROM TRACKS AS T 
  LEFT OUTER JOIN PROJECTS AS P ON T.ID = P.TRACK_ID 
  LEFT OUTER JOIN ARTICLES AS A ON A.PROJECT_ID = P.ID
  WHERE T.ID = ${TRACK_ID} 
 `;

class UserTrack extends Model {
  ARTICLES_OF_PROJECTS_OF_TRACK: (Number) => string;

  constructor() {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
    this.ARTICLES_OF_PROJECTS_OF_TRACK = TRACK_PAGE_SQL;
  }

  async findAllArticlesOfProjectsOfTracks(TRACK_ID) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      return conn.query(this.ARTICLES_OF_PROJECTS_OF_TRACK(TRACK_ID));
    } catch (error) {
      conn.rollback();
      console.error(error);
      throw new Error('GET METHOD ERROR');
    } finally {
      conn.release();
    }
  }
}

export default new UserTrack();
