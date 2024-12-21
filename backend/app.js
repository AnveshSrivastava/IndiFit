import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './route/user.route.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5501',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(morgan('dev'));  // Logging middleware

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

// Define routes
app.use('/User', userRoute);

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
