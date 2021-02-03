import express from 'express';
import controller from '../controllers/article';

const router = express.Router();

router
  .route('/')
  .get(controller.getAllArticle)
  .post(controller.createOneArticle)
  .delete(controller.deleteOneArticle);

export default router;
