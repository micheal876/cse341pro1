require('dotenv').config();  // Load environment variables
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

// Serialize user - storing the user id in the session
passport.serializeUser((user, done) => {
  done(null, user.id);  // Save only the user ID in session for performance reasons
});

// Deserialize user - retrieve the full user object based on the user ID stored in session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// GitHub strategy configuration
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL   // Use .env callback URL
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        // If no user is found, create a new one
        const newUser = new User({
          username: profile.username,
          githubId: profile.id
        });
        user = await newUser.save();
      }
      return done(null, user);  // Return the user object
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;
