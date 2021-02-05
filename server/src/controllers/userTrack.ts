import userTrack from '../models/userTrack';
import model from '../models/userTrack';

class UserTrack {
  static async getAllUserTrack(req, res, next) {
    try {
      const [userTracks] = await model.findAll();
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

  static async getOneUserTrack(req, res, next) {
    try {
      const [userTracks] = await model.findAllWhere(req.user.ID);
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

  static async getAllTrackOfUser(req, res, next) {
    try {
      const { USER_ID } = req.params;
      const [userTracks] = await model.findAllWhere(USER_ID);
      return res
        .status(200)
        .send({ message: '특정 유저의 트랙 정보입니다.', result: userTracks });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '특정 유저의 트랙 정보를 가져오는 데에 실패하였습니다.',
      });
    }
  }

  static async getAllArticlesOfProjectsOfTracks(req, res, next) {
    try {
      let result = [];
      const { TRACK_ID } = req.params;
      const [userTracks]: any = await model.findAllArticlesOfProjectsOfTracks(
        TRACK_ID,
      );

      for (let i = 0; i < userTracks.length; i++) {
        const cur = userTracks[i];
        if (!result[cur.PROJECT_ID]) {
          result[cur.PROJECT_ID] = {
            pid: cur.PROJECT_ID,
            ptitle: cur.PROJECT_TITLE,
            child: [{ aid: cur.ARTICLE_ID, atitle: cur.ARTICLE_TITLE }],
          };
        } else {
          result[cur.PROJECT_ID].child.push({
            aid: cur.ARTICLE_ID,
            atitle: cur.ARTICLE_TITLE,
          });
        }
      }

      return res.status(200).send({
        message: '특정 유저의 트랙_프로젝트_게시글 정보입니다.',
        result: result.filter(el => el),
      });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message:
          '특정 유저의 트랙_프로젝트_게시글 정보를 가져오는 데에 실패하였습니다.',
      });
    }
  }

  // static async createOneUserTrack(req, res, next) {
  //   try {
  //     const { STUDENT_ID, DEPARTMENT } = await req.body;
  //     if (!STUDENT_ID) {
  //       return res.status(401).send({ message: '학번을 다시 확인해주세요.' });
  //     }
  //     if (!DEPARTMENT) {
  //       return res
  //         .status(401)
  //         .send({ message: '트랙 이름을 다시 확인해주세요.' });
  //     }
  //     const createdUser = await userModel.findOne({ where: { STUDENT_ID } });
  //     const createdTrack = await trackModel.findOne({ where: { DEPARTMENT } });

  //     const isCreated = await model.findOne({
  //       where: { USER_ID: createdUser.ID, TRACK_ID: createdTrack.ID },
  //     });
  //     if (!!isCreated) {
  //       return res.status(200).send({
  //         message: '이미 이 유저는 등록되어 있습니다.',
  //         result: isCreated,
  //       });
  //     }

  //     const newUserTrack = await model.create({
  //       USER_ID: createdUser.ID,
  //       TRACK_ID: createdTrack.ID,
  //     });

  //     return res.status(201).send({
  //       message: '해당 트랙에 유저를 등록하는 데에 성공하였습니다.',
  //       result: newUserTrack,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res
  //       .status(401)
  //       .send({ message: '유저_트랙 관계 생성에 실패하였습니다.' });
  //   }
  // }

  static async deleteOneUserTrack(req, res, next) {
    try {
      const { USER_ID, TRACK_ID } = await req.body;
      if (!USER_ID) {
        return res.status(401).send({ message: '유저를 다시 확인해주세요.' });
      }
      if (!TRACK_ID) {
        return res.status(401).send({ message: '트랙을 다시 확인해주세요.' });
      }

      await model.destroy({ USER_ID: USER_ID, TRACK_ID: TRACK_ID });

      return res
        .status(200)
        .send({ message: '유저_트랙 관계가 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send({ message: '유저_트랙 관계 삭제에 실패하였습니다.' });
    }
  }
}

export default UserTrack;
