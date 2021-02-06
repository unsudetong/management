import express from 'express';
import controller from '../controllers/track';

const router = express.Router();

router.route('/:TRACK_ID').delete(controller.deleteOneTrack);

router.route('/').get(controller.getAllTrack).post(controller.createOneTrack);

export default router;
