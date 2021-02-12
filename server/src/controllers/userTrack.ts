import userTrack from '../models/userTrack';
import model from '../models/userTrack';

class UserTrack {
  static async getAllUserTrack(req, res, next) {
    try {
      const [userTracks] = await model.findAll();
      return res
        .status(200)
        .json({ message: '유저_트랙 관계의 목록입니다.', result: userTracks });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: '유저_트랙 관계 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async getOneUserTrack(req, res, next) {
    try {
      const [userTracks] = await model.findAllWhere(req.user.ID);
      return res
        .status(200)
        .json({ message: '유저_트랙 관계의 목록입니다.', result: userTracks });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
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
        .json({ message: '특정 유저의 트랙 정보입니다.', result: userTracks });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
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

      return res.status(200).json({
        message: '특정 유저의 트랙_프로젝트_게시글 정보입니다.',
        result: result.filter(el => el),
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message:
          '특정 유저의 트랙_프로젝트_게시글 정보를 가져오는 데에 실패하였습니다.',
      });
    }
  }

  static async deleteOneUserTrack(req, res, next) {
    try {
      const { USER_ID, TRACK_ID } = await req.body;
      if (!USER_ID) {
        return res.status(401).json({ message: '유저를 다시 확인해주세요.' });
      }
      if (!TRACK_ID) {
        return res.status(401).json({ message: '트랙을 다시 확인해주세요.' });
      }
      await model.destroy({ USER_ID: USER_ID, TRACK_ID: TRACK_ID });
      return res
        .status(200)
        .json({ message: '유저_트랙 관계가 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: '유저_트랙 관계 삭제에 실패하였습니다.' });
    }
  }
}

export default UserTrack;
