import request from 'supertest';
// import {admin, article, } from '../models';
import app from '../app';

describe('DB TEST', () => {
  // beforeAll(async () => {
  //   await sequelize.track.sync({});
  //   await sequelize.user.sync({});
  //   await sequelize.userTrack.sync({});
  //   await sequelize.admin.sync({});
  //   await sequelize.project.sync({});
  //   await sequelize.article.sync({});
  // });

  // afterAll(async () => {
  //   await sequelize.close();
  // });

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
  });

  describe('TRACKS TABLE', () => {
    it('GET / tracks 트랙 리스트를 조회합니다.', async done => {
      try {
        const response = await request(app).get('/tracks');
        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('POST / tracks 트랙을 하나 추가합니다.', async done => {
      try {
        const response = await request(app).post('/tracks').send({
          DEPARTMENT: 'math',
        });
        console.log('response의 상태코드가 201이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(201);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('USER_TRACKS TABLE', () => {
    it('GET / user_tracks 트랙 리스트를 조회합니다.', async done => {
      try {
        const response = await request(app).get('/user_tracks');
        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('POST / user_tracks 트랙을 하나 추가합니다.', async done => {
      try {
        const response = await request(app).post('/user_tracks').send({
          STUDENT_ID: '111111111',
          DEPARTMENT: 'math',
        });
        console.log('response의 상태코드가 201이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(201);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('ADMINS TABLE', () => {
    it('GET / admins 트랙 리스트를 조회합니다.', async done => {
      try {
        const response = await request(app).get('/admins');
        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('POST / admins 트랙을 하나 추가합니다.', async done => {
      try {
        const response = await request(app).post('/admins').send({
          STUDENT_ID: '111111111',
        });
        console.log('response의 상태코드가 201이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(201);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('PROJECTS TABLE', () => {
    it('GET / projects 리스트를 조회합니다.', async done => {
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

    it('POST / projects를 하나 추가합니다.', async done => {
      try {
        const response = await request(app).post('/projects').send({
          TITLE: 'PROJECT_TITLE',
          DEPARTMENT: 'math',
        });
        console.log('response의 상태코드가 201이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(201);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('ARTICLES TABLE', () => {
    it('GET / articles 리스트를 조회합니다.', async done => {
      try {
        const response = await request(app).get('/articles');
        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('POST / articles을 하나 추가합니다.', async done => {
      try {
        const response = await request(app).post('/articles').send({
          TITLE: 'ARTICLE_TITLE',
          PROJECT_TITLE: 'PROJECT_TITLE',
        });
        console.log('response의 상태코드가 201이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(201);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('DELETE APIs', () => {
    it('DELETE / articles을 하나 삭제합니다.', async done => {
      try {
        const response = await request(app).delete('/articles').send({
          TITLE: 'ARTICLE_TITLE',
          PROJECT_TITLE: 'PROJECT_TITLE',
        });

        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('DELETE / projects를 하나 삭제합니다.', async done => {
      try {
        const response = await request(app).delete('/projects').send({
          TITLE: 'PROJECT_TITLE',
          DEPARTMENT: 'math',
        });

        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('DELETE / admins 트랙을 하나 삭제합니다.', async done => {
      try {
        const response = await request(app).delete('/admins').send({
          STUDENT_ID: '111111111',
        });

        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('DELETE / user_tracks 트랙을 하나 삭제합니다.', async done => {
      try {
        const response = await request(app).delete('/user_tracks').send({
          STUDENT_ID: '111111111',
          DEPARTMENT: 'math',
        });

        console.log('response의 상태코드가 200이 나오기를 원합니다.');
        console.log(response.text);
        expect(response.status).toEqual(200);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('DELETE / tracks 트랙을 하나 삭제합니다.', async done => {
      try {
        const response = await request(app).delete('/tracks').send({
          DEPARTMENT: 'math',
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
