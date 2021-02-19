import dotenv from 'dotenv';
dotenv.config();

const GITHUB_CLIENT_ID: string = process.env.GH_ID;
const GITHUB_CLIENT_SECRET: string = process.env.GH_SECRET;

const oAuth = {
  development: {
    github: {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GH_DEV_CALLBACK_URL,
      clientRootURL: process.env.CLIENT_ROOT_URL,
    },
  },
  production: {
    github: {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GH_CALLBACK_URL,
      clientRootURL: process.env.CLIENT_ROOT_URL,
    },
  },
};

const option = process.env.NODE_ENV || 'production';

export default oAuth[option];
