import express from 'express';
import controller from '../controllers/article';

const router = express.Router();

router
  .route('/:ARTICLE_ID')
  .get(controller.getOneArticle)
  .delete(controller.deleteOneArticle);

router
  .route('/')
  .get(controller.getAllArticle)
  .post(controller.createOneArticle);

export default router;
