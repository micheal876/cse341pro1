// passport-setup.js
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GitHubStrategy({
    clientID:'Ov23li4wErq0TkdTnlDv',
    clientSecret:'2b30185c27d64f72680cf95492e23eec2ceca349',
    callbackURL: 'http://localhost:5000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in our db
    User.findOne({ githubId: profile.id }).then((existingUser) => {
        if (existingUser) {
            done(null, existingUser);
        } else {
            // If not, create a new user in our db
            new User({
                githubId: profile.id,
                username: profile.username,
            }).save().then((newUser) => {
                done(null, newUser);
            });
        }
    });
}));
