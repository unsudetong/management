import model from '../models/track';

class Track {
  static async getAllTrack(req, res, next) {
    try {
      const [tracks] = await model.findAll();
      return res
        .status(200)
        .send({ message: '트랙의 목록입니다.', result: tracks });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '트랙 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async createOneTrack(req, res, next) {
    try {
      const { DEPARTMENT } = await req.body;
      if (!DEPARTMENT) {
        return res.status(401).send({ message: '분야를 다시 확인해주세요.' });
      }
      const isCreated = await model.findAllWhere(DEPARTMENT);
      if (!!isCreated.length) {
        return res
          .status(200)
          .send({ message: '이미 생성된 트랙입니다.', result: isCreated });
      }

      const newTrack = await model.create({ DEPARTMENT });
      return res
        .status(201)
        .send({ message: '트랙 생성에 성공하였습니다.', result: newTrack });
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: '트랙 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneTrack(req, res, next) {
    try {
      const { ID } = await req.body;
      await model.destroy(ID);
      return res.status(200).send({ message: '트랙이 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: '트랙 삭제에 실패하였습니다.' });
    }
  }
}

export default Track;
