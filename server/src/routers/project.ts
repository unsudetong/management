import express from 'express';
import controller from '../controllers/project';

const router = express.Router();

router
  .route('/')
  .get(controller.getAllProject)
  .post(controller.createOneProject)
  .delete(controller.deleteOneProject);

router.route('/:TRACK_ID').get(controller.getAlloProjectOfTrack);

export default router;
