import Model from './model';

const GET_QUERY = 'SELECT * FROM USERS';
const GET_QUERY_WHERE = term =>
  GET_QUERY + ` WHERE STUDENT_ID = ${term} LIMIT 1`;
const POST_QUERY = `INSERT INTO USERS SET ?`;
const DELETE_QUERY = ID => `DELETE FROM USERS WHERE ID = ${ID}`;

class User extends Model {
  constructor() {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
  }
}

export default new User();
