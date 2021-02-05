import Model from './model.js';

const GET_QUERY = 'SELECT * FROM TRACKS';
const GET_QUERY_WHERE = term => GET_QUERY + ` WHERE ID = ${term}`;
const POST_QUERY = POST_DATA => ``;
const DELETE_QUERY = id => ``;

class Track extends Model {
  constructor() {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
  }
}

export default new Track();
