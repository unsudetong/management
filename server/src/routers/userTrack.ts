import express from 'express';
import controller from '../controllers/userTrack';

const router = express.Router();

router
  .route('/')
  .get(controller.getAllUserTrack)
  .post(controller.createOneUserTrack)
  .delete(controller.deleteOneUserTrack);

export default router;
