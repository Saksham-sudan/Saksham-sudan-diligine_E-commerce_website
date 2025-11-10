// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // Loads .env variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Import and use routes
const productRouter = require('./routes/product.routes');
app.use('/api/products', productRouter); // All product routes will be under /api/products

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});