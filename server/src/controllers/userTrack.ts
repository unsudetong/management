import models from '../models';
const model = models.userTrack;
const userModel = models.user;
const trackModel = models.track;

class UserTrack {
  static async getAllUserTrack(req, res, next) {
    try {
      const userTracks = await model.findAll({});
      if (!userTracks.length) {
        return res.status(200).send({
          message: '현재 아무 유저_트랙 관계도 없습니다.',
          result: userTracks,
        });
      }
      return res
        .status(200)
        .send({ message: '유저_트랙 관계의 목록입니다.', result: userTracks });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '유저_트랙 관계 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async createOneUserTrack(req, res, next) {
    try {
      const { STUDENT_ID, DEPARTMENT } = await req.body;
      if (!STUDENT_ID) {
        return res.status(401).send({ message: '학번을 다시 확인해주세요.' });
      }
      if (!DEPARTMENT) {
        return res
          .status(401)
          .send({ message: '트랙 이름을 다시 확인해주세요.' });
      }
      const createdUser = await userModel.findOne({ where: { STUDENT_ID } });
      const createdTrack = await trackModel.findOne({ where: { DEPARTMENT } });

      const isCreated = await model.findOne({
        where: { USER_ID: createdUser.ID, TRACK_ID: createdTrack.ID },
      });
      if (!!isCreated) {
        return res.status(200).send({
          message: '이미 이 유저는 등록되어 있습니다.',
          result: isCreated,
        });
      }

      const newUserTrack = await model.create({
        USER_ID: createdUser.ID,
        TRACK_ID: createdTrack.ID,
      });

      return res.status(201).send({
        message: '해당 트랙에 유저를 등록하는 데에 성공하였습니다.',
        result: newUserTrack,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send({ message: '유저_트랙 관계 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneUserTrack(req, res, next) {
    try {
      const { STUDENT_ID, DEPARTMENT } = await req.body;
      if (!STUDENT_ID) {
        return res.status(401).send({ message: '학번을 다시 확인해주세요.' });
      }
      if (!DEPARTMENT) {
        return res
          .status(401)
          .send({ message: '트랙 이름을 다시 확인해주세요.' });
      }
      const createdUser = await userModel.findOne({ where: { STUDENT_ID } });
      const createdTrack = await trackModel.findOne({ where: { DEPARTMENT } });

      const result = await model.destroy({
        where: { USER_ID: createdUser.ID, TRACK_ID: createdTrack.ID },
      });

      if (!!result) {
        return res
          .status(200)
          .send({ message: '유저_트랙 관계가 삭제되었습니다.' });
      }
      return res
        .status(400)
        .send({ message: '해당하는 유저_트랙 관계가 없습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send({ message: '유저_트랙 관계 삭제에 실패하였습니다.' });
    }
  }
}

export default UserTrack;
