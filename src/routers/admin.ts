import express from 'express';
import controller from '../controllers/admin';

const router = express.Router();

router.route('/:USER_ID').delete(controller.deleteOneAdmin);
router.route('/');
router
  .route('/')
  .get(controller.getAllAdmin)
  .post(controller.createOneAdmin)
  .head(controller.isAdmin);

export default router;
