import dotenv from 'dotenv';
dotenv.config();

const GITHUB_CLIENT_ID: string = process.env.GH_ID;
const GITHUB_CLIENT_SECRET: string = process.env.GH_SECRET;
const GITHUB_CALLBACK_URL: string = process.env.GH_CALLBACK_URL;

const oAuth = {
  development: {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1/auth/github',
  },
  production: {
    github: {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
  },
};

export default oAuth;
