import models from '../models';
const model = models.projectArticle;

class ProjectArticle {
  static getAllProjectArticle(req, res, next) {
    const projectArticles = model.findAll({});
    return res.json(projectArticles);
  }
}

export default ProjectArticle;
