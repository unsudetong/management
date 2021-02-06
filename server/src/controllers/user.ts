import model from '../models/user';

class User {
  static async getAllUser(req, res, next) {
    try {
      const [users] = await model.findAll();
      return res
        .status(200)
        .send({ message: '유저의 목록입니다.', result: users });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '유저 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async createOneUser(req, res, next) {
    try {
      const { STUDENT_ID, PASSWORD } = await req.body;
      if (!STUDENT_ID) {
        return res.status(401).send({ message: '학번을 다시 확인해주세요.' });
      }
      if (!PASSWORD) {
        return res
          .status(401)
          .send({ message: '비밀번호을 다시 확인해주세요.' });
      }

      const [newUser] = await model.create({ STUDENT_ID, PASSWORD });
      return res.status(201).send({
        message: '회원가입에 성공하였습니다.',
        result: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: '유저 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneUser(req, res, next) {
    try {
      const { USER_ID } = await req.params;
      await model.destroy(USER_ID);
      return res.status(400).send({ message: '유저를 삭제하였습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: '유저 삭제에 실패하였습니다.' });
    }
  }
}

export default User;
