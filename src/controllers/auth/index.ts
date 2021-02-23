import { NextFunction } from 'express';
import { Request, Response } from 'express';
import passport from 'passport';

export const githubLoginFail = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response<JSON> => {
  return res.json({ state: 'fail' });
};

export const github = passport.authenticate('github');

export const githubFailure = passport.authenticate('github', {
  failureRedirect: '/github/LoginFail',
});
