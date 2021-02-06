import model from '../models/admin';

class Admin {
  static async getAllAdmin(req, res, next) {
    try {
      const [admins] = await model.findAll();
      return res
        .status(200)
        .send({ message: '관리자의 목록입니다.', result: admins });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '관리자 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async createOneAdmin(req, res, next) {
    try {
      const { USER_ID } = await req.params;
      if (!USER_ID) {
        return res.status(401).send({ message: '학번을 다시 확인해주세요.' });
      }

      const [isCreated]: any = await model.findAllWhere(USER_ID);
      if (!isCreated.length) {
        return res.status(200).send({
          message: '이미 이 관리자는 등록되어 있습니다.',
          result: isCreated,
        });
      }

      const newAdmin = await model.create({ USER_ID });

      return res.status(201).send({
        message: '해당 트랙에 관리자를 등록하는 데에 성공하였습니다.',
        result: newAdmin,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send({ message: '관리자_트랙 관계 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneAdmin(req, res, next) {
    try {
      const { USER_ID } = await req.params;
      if (!USER_ID) {
        return res.status(401).send({ message: '학번을 다시 확인해주세요.' });
      }
      await model.destroy(USER_ID);
      return res.status(200).send({ message: '관리자가 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: '관리자 삭제에 실패하였습니다.' });
    }
  }
}

export default Admin;
