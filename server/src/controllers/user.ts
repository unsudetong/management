import models from '../models';
const model = models.user;

// TODO : 상태코드를 전부 추가해놔야 한다.

class User {
  static async getAllUser(req, res, next) {
    try {
      const users = await model.findAll({});
      if (!users.length) {
        return res
          .status(200)
          .send({ message: '현재 아무 유저도 없습니다.', result: users });
      }
      return res
        .status(200)
        .send({ message: '유저의 목록입니다.', result: users });
    } catch (error) {
      console.error(error);
      return res.send({
        message: '유저 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async createOneUser(req, res, next) {
    try {
      const { STUDENT_ID, PASSWORD } = req.body;
      if (!STUDENT_ID) {
        return res.status(401).send({ message: '학번을 다시 확인해주세요.' });
      }
      if (!PASSWORD) {
        return res
          .status(401)
          .send({ message: '비밀번호을 다시 확인해주세요.' });
      }
      const isCreated = await model.findAll({
        where: { STUDENT_ID },
      });

      if (!!isCreated.length) {
        return res.status(200).send({
          message: '동일한 학번의 유저가 존재합니다!',
          result: isCreated,
        });
      }

      const newUser = await model.create({ STUDENT_ID, PASSWORD });
      return res.status(201).send({
        message: '회원가입 및 로그인이 성공',
        result: newUser,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default User;
