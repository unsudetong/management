import pool from '../config/database/pool';

class Model {
  GET_QUERY: string;
  GET_QUERY_WHERE: (string) => string;
  POST_QUERY: string;
  DELETE_QUERY: (string) => string;

  constructor(GET_QUERY, GET_QUERY_WHERE, POST_QUERY, DELETE_QUERY) {
    this.GET_QUERY = GET_QUERY;
    this.GET_QUERY_WHERE = GET_QUERY_WHERE;
    this.POST_QUERY = POST_QUERY;
    this.DELETE_QUERY = DELETE_QUERY;
  }

  async findAll() {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      return conn.query(this.GET_QUERY);
    } catch (error) {
      conn.rollback();
      console.error(error);
      throw new Error('GET METHOD ERROR');
    } finally {
      conn.release();
    }
  }

  async findAllWhere(value) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      return conn.query(this.GET_QUERY_WHERE(value));
    } catch (error) {
      conn.rollback();
      console.error(error);
      throw new Error('GET METHOD ERROR');
    } finally {
      conn.release();
    }
  }

  async create(POST_DATA) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      return conn.query(this.POST_QUERY, POST_DATA);
    } catch (error) {
      conn.rollback();
      console.error(error);
      throw new Error('GET METHOD ERROR');
    } finally {
      conn.release();
    }
  }

  async destroy(ID) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query(this.DELETE_QUERY(ID));
      await conn.commit();
    } catch (error) {
      conn.rollback();
      console.error(error);
      throw new Error('DELETE METHOD ERROR');
    } finally {
      conn.release();
    }
  }
}

export default Model;
