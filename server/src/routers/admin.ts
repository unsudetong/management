import express from 'express';
import controller from '../controllers/admin';

const router = express.Router();

router
  .route('/')
  .get(controller.getAllAdmin)
  .post(controller.createOneAdmin)
  .delete(controller.deleteOneAdmin);

export default router;
