import models from '../models';
const model = models.article;

class Article {
  static getAllArticle(req, res, next) {
    const articles = model.findAll({});
    return res.json(articles);
  }
}

export default Article;
