import passport from 'passport';
import GitHub from 'passport-github2';
import dotenv from 'dotenv';
dotenv.config();

const GitHubStrategy = GitHub.Strategy;

let GITHUB_CLIENT_ID: string = process.env.GH_ID;
let GITHUB_CLIENT_SECRET: string = process.env.GH_SECRET;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ githubId: profile.id }, (err, user) => {
      return done;
    },
  ),
);

export default passport;
