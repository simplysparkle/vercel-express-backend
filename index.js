// index.js
require('dotenv').config();

const express = require('express');
const app = express();


// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true, // This is important for cookies, authorization headers with HTTPS
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));
  

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
