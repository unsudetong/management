import express from 'express';
import controller from '../controllers/article';
import { adminCheckMiddleware } from '../middlewares';

const router = express.Router();

router
  .route('/:ARTICLE_ID')
  .get(controller.getOneArticle)
  .delete(adminCheckMiddleware, controller.deleteOneArticle);

router
  .route('/')
  .get(controller.getAllArticle)
  .post(adminCheckMiddleware, controller.createOneArticle);

export default router;
