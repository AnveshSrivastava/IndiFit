import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Import Route
import userRoute from './route/user.route.js';

dotenv.config();
const app = express();

// Middleware Setup
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(morgan('dev'));  // Logging middleware to monitor requests

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Define Routes
app.use('/user', userRoute);  // Route for user authentication (single user login)

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send("Server is healthy");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
