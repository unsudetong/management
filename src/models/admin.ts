import Model from './model';

const GET_QUERY = 'SELECT * FROM ADMINS';
const GET_QUERY_WHERE = term => GET_QUERY + ` LIMIT1 WHERE USER_ID = ${term}`;
const POST_QUERY = `INSERT INTO ADMINS SET ?`;
const DELETE_QUERY = ID => `DELETE FROM ADMINS WHERE USER_ID = ${ID}`;

class Admin extends Model {
  constructor() {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
  }
}

export default new Admin();
