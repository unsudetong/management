import model from '../models/user';
import bcrypt from 'bcrypt';

class User {
  static async getAllUser(req, res, next) {
    try {
      const [users] = await model.findAll();
      return res
        .status(200)
        .json({ message: '유저의 목록입니다.', result: users });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: '유저 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async createOneUser(req, res, next) {
    try {
      const { USER_ID, PASSWORD } = await req.body;
      const [isUser] = await model.findAllWhere(USER_ID);
      if (isUser) {
        return res.status(400).json({
          message: '이미 생성된 유저입니다.',
        });
      }

      const hashPassword = await bcrypt.hash(PASSWORD, 12);

      const [newUser] = await model.create({
        USER_ID: USER_ID,
        PASSWORD: hashPassword,
      });
      return res.status(201).json({
        message: '회원가입에 성공하였습니다.',
        result: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: '유저 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneUser(req, res, next) {
    try {
      const { USER_ID } = await req.params;
      await model.destroy(USER_ID);
      return res.status(400).json({ message: '유저를 삭제하였습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: '유저 삭제에 실패하였습니다.' });
    }
  }
}

export default User;
