import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './route/user.route.js'; // Ensure correct import path

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());  // Middleware to parse JSON request bodies
app.use(morgan('dev'));  // Log HTTP requests

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

mongoose.connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Register the user routes
app.use('/User', userRoute);  // This means all routes in userRoute will be prefixed with '/User'

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send("Server is healthy");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
