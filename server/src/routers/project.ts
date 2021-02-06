import express from 'express';
import controller from '../controllers/project';

const router = express.Router();

router.route('/:TRACK_ID').get(controller.getAlloProjectOfTrack);

router.route('/:PROJECT_ID').delete(controller.deleteOneProject);

router
  .route('/')
  .get(controller.getAllProject)
  .post(controller.createOneProject);

export default router;
