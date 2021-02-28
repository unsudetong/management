import express from 'express';
import controller from '../controllers/userTrack';
import { adminCheckMiddleware } from '../middlewares';

const router = express.Router();

router.route('/:TRACK_ID').get(controller.getAllArticlesOfProjectsOfTracks);

router
  .route('/')
  .get(controller.getAllUserTrack)
  .delete(adminCheckMiddleware, controller.deleteOneUserTrack);

export default router;
