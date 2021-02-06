import express from 'express';
import controller from '../controllers/article';

const router = express.Router();

router.route('/:PROJECT_ID').get(controller.getAllArticleOfProejct);

router.route('./:ARTICLE_ID').delete(controller.deleteOneArticle);

router
  .route('/')
  .get(controller.getAllArticle)
  .post(controller.createOneArticle);

export default router;
