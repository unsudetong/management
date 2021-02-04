import express from 'express';
import controller from '../controllers/userTrack';

const router = express.Router();

router.route('/:USER_ID').get(controller.getAllTrackOfUser);

router
  .route('/')
  .get(controller.getAllUserTrack)
  .post(controller.createOneUserTrack)
  .delete(controller.deleteOneUserTrack);

router.route('/:USER_ID').get(controller.getAllTrackOfUser);

export default router;
