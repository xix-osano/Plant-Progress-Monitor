require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const plantRoutes = require('./routes/plantRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Body parser for JSON data

// Serve static files (e.g., uploaded images)
app.use('/uploads', express.static('uploads'));

// Define Routes
app.use('/api/plants', plantRoutes);

// Route for health check
app.get('/', (req, res) => {
  res.send('Plant Monitor API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));