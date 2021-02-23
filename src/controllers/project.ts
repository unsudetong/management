import model from '../models/project';

class Project {
  static async getAllProject(req, res, next) {
    try {
      const [projects] = await model.findAll();
      return res
        .status(200)
        .json({ message: '프로젝트의 목록입니다.', result: projects });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
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
        .json({ message: '해당 트랙의 프로젝트들입니다.', result: projects });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: '해당 트랙에서 프로젝트를 가져오는 데에 실패하였습니다.',
      });
    }
  }

  static async createOneProject(req, res, next) {
    try {
      const { TITLE, TRACK_ID, WRITER } = await req.body;
      const [newProject] = await model.create({
        TITLE: TITLE,
        TRACK_ID: TRACK_ID,
        WRITER: WRITER,
      });

      return res.status(201).json({
        message: '해당 트랙에 프로젝트를 등록하는 데에 성공하였습니다.',
        result: newProject,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: '프로젝트 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneProject(req, res, next) {
    try {
      const { PROJECT_ID } = await req.params;
      await model.destroy(PROJECT_ID);
      return res.status(200).json({ message: '프로젝트가 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: '프로젝트 삭제에 실패하였습니다.' });
    }
  }
}

export default Project;
