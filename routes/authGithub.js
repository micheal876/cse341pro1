// routes/authGithub.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// GitHub OAuth login route
router.get('/github', passport.authenticate('github'));

// GitHub OAuth callback route
router.get('/github/callback', (req, res) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // User is authenticated
        res.json({ message: 'Login successful', user });
    })(req, res);
});

module.exports = router;
