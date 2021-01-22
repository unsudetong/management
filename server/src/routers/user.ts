import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.route('/').get(controller.getAllUser);

export default router;
