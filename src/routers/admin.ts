import express from 'express';
import controller from '../controllers/admin';

const router = express.Router();

router.route('/:USER_ID').delete(controller.deleteOneAdmin);
router.route('/:USER_ID').post(controller.createOneAdmin);
router.route('/').get(controller.getAllAdmin).head(controller.isAdmin);

export default router;
