import model from '../models/project';

class Project {
  static async getAllProject(req, res, next) {
    try {
      const [projects] = await model.findAll();
      return res
        .status(200)
        .send({ message: '프로젝트의 목록입니다.', result: projects });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '프로젝트 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async getAlloProjectOfTrack(req, res, next) {
    try {
      const { TRACK_ID } = await req.params;
      const [projects] = await model.findAllWhere(TRACK_ID);
      res
        .status(200)
        .send({ message: '해당 트랙의 프로젝트들입니다.', result: projects });
    } catch (error) {
      console.log(error);
      return res.status(401).send({
        message: '해당 트랙에서 프로젝트를 가져오는 데에 실패하였습니다.',
      });
    }
  }

  // TODO : DEPARTMENT가 아니라 TRACK의 ID를 받아 등록할 수 있도록 해야 한다.
  static async createOneProject(req, res, next) {
    try {
      const { TITLE, CONTENTS, TRACK_ID } = await req.body;
      if (!TITLE) {
        return res.status(401).send({ message: '제목을 다시 확인해주세요.' });
      }
      if (!TRACK_ID) {
        return res.status(401).send({ message: '트랙을 다시 확인해주세요.' });
      }

      // const isCreated = await model.findAllWhere({
      //   TITLE: TITLE,
      //   CONTENTS: CONTENTS,
      //   TRACK_ID: TRACK_ID,
      // });

      const newProject = await model.create({
        TITLE: TITLE,
        CONTENTS: CONTENTS,
        TRACK_ID: TRACK_ID,
      });

      return res.status(201).send({
        message: '해당 트랙에 프로젝트를 등록하는 데에 성공하였습니다.',
        result: newProject,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send({ message: '프로젝트 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneProject(req, res, next) {
    try {
      const { PROJECT_ID } = await req.body;
      if (!PROJECT_ID) {
        return res.status(401).send({ message: '제목을 다시 확인해주세요.' });
      }
      await model.destroy(PROJECT_ID);
      return res.status(200).send({ message: '프로젝트가 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send({ message: '프로젝트 삭제에 실패하였습니다.' });
    }
  }
}

export default Project;
