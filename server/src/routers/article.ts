import express from 'express';
import controller from '../controllers/article';

const router = express.Router();

router
  .route('/')
  .get(controller.getAllArticle)
  .post(controller.createOneArticle)
  .delete(controller.deleteOneArticle);

router.route('/:PROJECT_ID').get(controller.getAllArticleOfProejct);

export default router;
