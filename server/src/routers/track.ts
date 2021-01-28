import express from 'express';
import controller from '../controllers/track';

const router = express.Router();

router
  .route('/')
  .get(controller.getAllTrack)
  .post(controller.createOneTrack)
  .delete(controller.deleteOneTrack);

export default router;
