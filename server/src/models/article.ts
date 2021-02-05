import Model from './model.js';

const GET_QUERY = 'SELECT * FROM ARTICLES';
const GET_QUERY_WHERE = term => GET_QUERY + ` WHERE PROJECT_ID = ${term}`;
const POST_QUERY = POST_DATA => ``;
const DELETE_QUERY = id => ``;

class Article extends Model {
  constructor() {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
  }
}

export default new Article();
