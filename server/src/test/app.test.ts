import request from 'supertest';
import sequelize from '../models';
import app from '../app';

describe('DB TEST', () => {
  beforeAll(async () => {
    await sequelize.track.sync({});
    await sequelize.user.sync({});
    await sequelize.userTrack.sync({});
    await sequelize.admin.sync({});
    await sequelize.project.sync({});
    await sequelize.article.sync({});
    await sequelize.projectArticle.sync({});
  });

  afterAll(async () => {
    // await sequelize.truncate({ cascade: true });
  });

  describe('PROJECTS TABLE', () => {
    it('프로젝트 리스트를 조회합니다.', async done => {
      try {
        const response = await request(app).get('/projects');
        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('USERS TABLE', () => {
    it('GET / users 유저 리스트를 조회합니다.', async done => {
      try {
        const response = await request(app).get('/users');
        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('POST / users 학번 없이 로그인을 합니다.', async done => {
      try {
        const response = await request(app).post('/users').send({
          PASSWORD: 'kakasoo',
        });
        console.log('response의 상태코드가 401이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(401);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('POST / users 비밀번호 없이 로그인을 합니다.', async done => {
      try {
        const response = await request(app).post('/users').send({
          STUDENT_ID: '111111111',
        });
        console.log('response의 상태코드가 401이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(401);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('POST / users 등록되지 않은 유저라면 회원가입을 합니다.', async done => {
      try {
        const response = await request(app).post('/users').send({
          STUDENT_ID: '111111111',
          PASSWORD: 'kakasoo',
        });
        console.log('response의 상태코드가 201이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(201);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('POST / users 로그인 정보가 DB의 USER 정보와 일치합니다.', async done => {
      try {
        const response = await request(app).post('/users').send({
          STUDENT_ID: '111111111',
          PASSWORD: 'kakasoo',
        });
        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('DELETE / users 특정 유저의 정보를 삭제합니다.', async done => {
      try {
        const response = await request(app).delete('/users').send({
          STUDENT_ID: '111111111',
          PASSWORD: 'kakasoo',
        });
        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
