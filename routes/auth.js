const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// GitHub OAuth callback
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      // Check if the user already exists in the database
      let user = await User.findOne({ githubId: req.user.githubId });
      if (!user) {
        // Create a new user in the database without a password
        const newUser = new User({
          username: req.user.username,
          githubId: req.user.githubId
        });
        user = await newUser.save();
      }
      // Successfully authenticated, redirect to dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Logout route (for POST requests)
router.post('/logout', (req, res) => {
  if (req.session) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to logout' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to destroy session' });
        }
        res.json({ message: 'Logout successful' });
      });
    });
  } else {
    res.status(400).json({ error: 'No active session' });
  }
});

// Logout route (for GET requests)
router.get('/logout', (req, res) => {
  if (req.session) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to logout' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to destroy session' });
        }
        res.json({ message: 'Logout successful' });
      });
    });
  } else {
    res.status(400).json({ error: 'No active session' });
  }
});

module.exports = router;
