import Model from './model';

const GET_QUERY = 'SELECT * FROM PROJECTS';
const GET_QUERY_WHERE = term => GET_QUERY + ` WHERE TRACK_ID = ${term}`;
const POST_QUERY = `INSERT INTO PROJECTS SET ?`;
const DELETE_QUERY = ID => `DELETE FROM PROJECTS WHERE ID = ${ID}`;

class Project extends Model {
  constructor() {
    super(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY);
  }
}

export default new Project();
