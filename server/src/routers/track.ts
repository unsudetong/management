import express from 'express';
import controller from '../controllers/track';

const router = express.Router();

router.route('/').get(controller.getAllTrack);

export default router;
