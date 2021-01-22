import express from 'express';
import controller from '../controllers/userTrack';

const router = express.Router();

router.route('/').get(controller.getAllUserTrack);

export default router;
