// index.js
require('dotenv').config();

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

// API routes can be added here if needed
// But typically, with Vercel, you define separate files under the `api` folder

// Export the Express app
module.exports = app;
