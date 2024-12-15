import express from 'express';
import { signup, login } from '../controllers/user.controller.js';

const userRoute = express.Router();

// POST request for user signup
userRoute.post('/signup', signup);

// POST request for user login
userRoute.post('/login', login);

export default userRoute;
