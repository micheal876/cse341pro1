const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// GitHub OAuth callback
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = await User.findOne({ githubId: req.user.githubId });
      if (!user) {
        // Create a new user in the database without a password
        const newUser = new User({
          username: req.user.username,
          githubId: req.user.githubId
        });
        await newUser.save();
      }
      // Successfully authenticated, redirect to dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

module.exports = router;
