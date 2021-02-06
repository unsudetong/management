import express from 'express';
import controller from '../controllers/admin';

const router = express.Router();

// TODO : ADMIN은 ADMIN_ID를 통해 삭제하지 못할 것이다.
router.route('/:USER_ID').delete(controller.deleteOneAdmin);
router.route('/:USER_ID').post(controller.createOneAdmin);
router.route('/').get(controller.getAllAdmin);

export default router;
