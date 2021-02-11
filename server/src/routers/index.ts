import express from 'express';
import admin from './admin';
import article from './article';
import project from './project';
import track from './track';
import userTrack from './userTrack';
import user from './user';
import auth from './auth';
import { isAuthenticate } from '../passport/jwt';

const router = express.Router();

router.use('/admins', isAuthenticate, admin);
router.use('/articles', isAuthenticate, article);
router.use('/projects', isAuthenticate, project);
router.use('/tracks', isAuthenticate, track);
router.use('/user_tracks', isAuthenticate, userTrack);
router.use('/users', isAuthenticate, user);

router.use('/auth', auth);

export default router;
