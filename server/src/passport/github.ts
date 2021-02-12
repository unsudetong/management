import GithubStretegy from 'passport-github';
import dotenv from 'dotenv';
import User from '../models/user';
dotenv.config();

const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  const { id, avatar_url, name, email } = profile._json;
  try {
    const [users]: any = await User.oAuthLogin(id);
    const user = users && users.length && users[0];
    if (user) {
      user.OAUTH_ID = id;
      return cb(null, user);
    }

    const [newUser] = await User.create({
      NAME: name,
      OAUTH_ID: id,
      USER_ID: id,
      PASSWORD: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export default new GithubStretegy(
  {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.SERVER_APP_ROOT + '/auth/github/callback',
    session: false,
  },
  githubLoginCallback,
);
