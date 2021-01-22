import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.route('/').get(controller.getAllUser).post(controller.createOneUser);

export default router;
