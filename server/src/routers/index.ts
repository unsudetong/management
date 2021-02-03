import express from 'express';
import admin from './admin';
import article from './article';
import project from './project';
import track from './track';
import userTrack from './userTrack';
import user from './user';

const router = express.Router();

router.use('/admins', admin);
router.use('/articles', article);
router.use('/projects', project);
router.use('/tracks', track);
router.use('/user_tracks', userTrack);
router.use('/users', user);

export default router;
