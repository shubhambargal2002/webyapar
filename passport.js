// passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '104871467453-abp8udomfhvkiib7lj49lf0if4oqvb5h.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ googleId: profile.id });

  if (user) {
    return done(null, user);
  }

  const newUser = await User.create({
    googleId: profile.id,
    username: profile.displayName,
  });

  return done(null, newUser);
}));

module.exports = passport;
