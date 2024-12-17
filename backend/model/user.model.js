import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'others'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Email must be unique
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    minlength: [10, 'Phone number must be 10 digits'],
    maxlength: [10, 'Phone number must be 10 digits'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
});


// Create the User model
const User = mongoose.model('User', userSchema);

export default User;