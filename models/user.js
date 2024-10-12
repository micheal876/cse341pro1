const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  githubId: {
    type: String, // Store GitHub ID if you are authenticating through GitHub
    unique: true,
    sparse: true
  },
  password: {
    type: String, // Make this optional for GitHub OAuth users
    required: function () {
      return !this.githubId; // Only required if not a GitHub user
    },
    select: false // By default, don't retrieve passwords for security
  }
});

// Ensure password is not fetched by default for security reasons
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
