import Model from './model';

const GET_QUERY = 'SELECT * FROM TRACKS';
const GET_QUERY_WHERE = term => GET_QUERY + ` WHERE ID = ${term}`;
const POST_QUERY = `INSERT INTO TRACKS SET ?`;
const DELETE_QUERY = ID => `DELETE FROM TRACKS WHERE ID = ${ID}`;

class Track extends Model {
  constructor() {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
  }
}

export default new Track();
