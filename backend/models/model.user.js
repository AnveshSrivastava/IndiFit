const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function () { return this.isSignup; }, // Only required for signup
    trim: true,
  },
  age: {
    type: Number,
    required: function () { return this.isSignup; }, // Only required for signup
  },
  gender: {
    type: String,
    required: function () { return this.isSignup; }, // Only required for signup
    enum: ['male', 'female', 'others'],
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email should be unique
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: function () { return this.isSignup; }, // Only required for signup
    length: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Password should be at least 6 characters
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare the password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
