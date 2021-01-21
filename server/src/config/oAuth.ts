import dotenv from 'dotenv';
dotenv.config();

const GITHUB_CLIENT_ID: string = process.env.GH_ID;
const GITHUB_CLIENT_SECRET: string = process.env.GH_SECRET;

const oAuth = {
  github: {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/',
  },
  google: {
    clientID: 'unknown',
    clientSecret: 'unknown',
    callbackURL: '/auth/google/callback',
  },
};

export default oAuth;
