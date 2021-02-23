import express from 'express';
import controller from '../controllers/userTrack';

const router = express.Router();

router.route('/:TRACK_ID').get(controller.getAllArticlesOfProjectsOfTracks);

router
  .route('/')
  .get(controller.getAllUserTrack)
  .delete(controller.deleteOneUserTrack);

export default router;
