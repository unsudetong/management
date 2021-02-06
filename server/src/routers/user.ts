import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.route('/:USER_ID').delete(controller.deleteOneUser);

router.route('/').get(controller.getAllUser).post(controller.createOneUser);

export default router;
