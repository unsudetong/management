import dotenv from 'dotenv';
dotenv.config();

const GITHUB_CLIENT_ID: string = process.env.GH_ID;
const GITHUB_CLIENT_SECRET: string = process.env.GH_SECRET;
const GITHUB_CALLBACK_URL: string = process.env.GH_CALLBACK_URL;

const oAuth = {
  github: {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
  },

  google: {
    clientID: 'unknown',
    clientSecret: 'unknown',
    callbackURL: '/auth/google/callback',
  },
};

export default oAuth;
