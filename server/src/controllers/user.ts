import express from 'express';
const router = express.Router();

import database from '../models';
const user = database.user;

router.route('/').get(async (req, res, next) => {
  // const account = await user.findAll({});
  console.log(req.headers);
  return res.json({});
});

export default router;
