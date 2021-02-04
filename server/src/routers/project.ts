import express from 'express';
import controller from '../controllers/project';

const router = express.Router();

router.route('/:TRACK_ID').get(controller.getAlloProjectOfTrack);

router
  .route('/')
  .get(controller.getAllProject)
  .post(controller.createOneProject)
  .delete(controller.deleteOneProject);

export default router;
