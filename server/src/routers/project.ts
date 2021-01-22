import express from 'express';
import controller from '../controllers/project';

const router = express.Router();

router.route('/').get(controller.getAllProject);

export default router;
