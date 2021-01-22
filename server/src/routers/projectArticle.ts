import express from 'express';
import controller from '../controllers/projectArticle';

const router = express.Router();

router.route('/').get(controller.getAllProjectArticle);

export default router;
