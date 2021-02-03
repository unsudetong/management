import models from '../models';
const projectModel = models.project;
const model = models.article;

class Article {
  static async getAllArticle(req, res, next) {
    try {
      const articles = await model.findAll({});
      if (!articles.length) {
        return res.status(200).send({
          message: '현재 아무 게시글도 없습니다.',
          result: articles,
        });
      }
      return res
        .status(200)
        .send({ message: '게시글의 목록입니다.', result: articles });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '게시글 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async getAllArticleOfProejct(req, res, next) {
    try {
      const { PROJECT_ID } = req.body;
      const articles = await model.findAll({
        where: { PROJECT_ID: PROJECT_ID },
      });
      return res.status(200).send({
        message: '특정 프로젝트의 게시글 목록입니다.',
        result: articles,
      });
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        message: '특정 프로젝트의 게시글들을 가져오는 데에 실패하였습니다.',
      });
    }
  }

  static async createOneArticle(req, res, next) {
    try {
      const { TITLE, PROJECT_TITLE, CONTENT } = await req.body;
      if (!TITLE) {
        return res.status(401).send({ message: '제목을 다시 확인해주세요.' });
      }
      if (!PROJECT_TITLE) {
        return res
          .status(401)
          .send({ message: '프로젝트 제목을 다시 확인해주세요.' });
      }

      // TODO : 다른 트랙에도 동일한 프로젝트 이름이 있을 수 있으니, unique한 값으로 탐색해야 한다.
      const createdProject = await projectModel.findOne({
        where: { TITLE: PROJECT_TITLE },
      });

      if (!createdProject) {
        res.status(401).send({
          message: '해당하는 프로젝트가 없습니다.',
        });
      }

      const isCreated = await model.findOne({
        where: { TITLE: TITLE, PROJECT_ID: createdProject.ID },
      });

      if (!!isCreated) {
        return res.status(200).send({
          message: '이미 이 게시글은 생성되어 있습니다.',
          result: isCreated,
        });
      }

      const newArticle = await model.create({
        PROJECT_ID: createdProject.ID,
        TITLE,
        CONTENT,
      });

      return res.status(201).send({
        message: '해당 프로젝트에 게시글을 등록하는 데에 성공하였습니다.',
        result: newArticle,
      });
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: '게시글 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneArticle(req, res, next) {
    try {
      const { TITLE, PROJECT_TITLE } = await req.body;
      if (!TITLE) {
        return res.status(401).send({ message: '제목을 다시 확인해주세요.' });
      }
      if (!PROJECT_TITLE) {
        return res
          .status(401)
          .send({ message: '프로젝트 제목을 다시 확인해주세요.' });
      }

      // TODO : 다른 트랙에도 동일한 프로젝트 이름이 있을 수 있으니, unique한 값으로 탐색해야 한다.
      const createdProject = await projectModel.findOne({
        where: { TITLE: PROJECT_TITLE },
      });

      const result = await model.destroy({
        where: { TITLE, PROJECT_ID: createdProject.ID },
      });

      if (!!result) {
        return res.status(200).send({ message: '게시글이 삭제되었습니다.' });
      }
      return res.status(400).send({ message: '해당하는 게시글이 없습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: '게시글 삭제에 실패하였습니다.' });
    }
  }
}

export default Article;
