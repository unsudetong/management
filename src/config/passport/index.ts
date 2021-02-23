import dotenv from 'dotenv';
dotenv.config();

const oAuth = {
  development: {
    github: {
      clientID: process.env.DEV_GH_ID,
      clientSecret: process.env.DEV_GH_SECRET,
      callbackURL: process.env.GH_DEV_CALLBACK_URL,
      URLafterLogin: process.env.DEV_CLIENT_URL,
    },
  },
  production: {
    github: {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.GH_CALLBACK_URL,
      URLafterLogin: process.env.CLIENT_URL,
    },
  },
};

console.log('NODE_ENV : ', process.env.NODE_ENV);
export default oAuth[process.env.NODE_ENV];
