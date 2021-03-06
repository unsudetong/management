import express from 'express';
import controller from '../controllers/article';
import { adminCheckMiddleware } from '../middlewares';
import model from '../models';

const router = express.Router();

router
  .route('/')
  .get(adminCheckMiddleware, async function allData(req, res, next) {
    try {
      const [tracks] = await model.track.findAll();
      const [projects] = await model.project.findAll();
      const [articles] = await model.article.findAll();
      const [admins] = await model.admin.findAll();
      const [users] = await model.user.findAll();

      return res.status(200).json({
        message: '수정 가능한 목록입니다.',
        result: {
          tracks: tracks,
          projects: projects,
          articles: articles,
          admins: admins,
          users: users,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: '정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  });

export default router;
