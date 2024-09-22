const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

// API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app; // Needed for Vercel's serverless function
