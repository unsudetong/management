import express from 'express';
import controller from '../controllers/user';
import { adminCheckMiddleware } from '../middlewares';

const router = express.Router();

router
  .route('/:USER_ID')
  .delete(adminCheckMiddleware, controller.deleteOneUser);

router
  .route('/')
  .get(controller.getAllUser)
  .post(adminCheckMiddleware, controller.createOneUser);

export default router;
