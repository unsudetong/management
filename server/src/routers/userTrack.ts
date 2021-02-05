import express from 'express';
import controller from '../controllers/userTrack';

const router = express.Router();

router.route('/:TRACK_ID').get(controller.getAllArticlesOfProjectsOfTracks);
// router.route('/:USER_ID').get(controller.getAllTrackOfUser);

router
  .route('/')
  .get(controller.getAllUserTrack)
  // .post(controller.createOneUserTrack)
  .delete(controller.deleteOneUserTrack);

export default router;
