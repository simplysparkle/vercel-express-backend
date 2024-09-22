// /api/appointments.js
const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const appointmentController = require('./src/controllers/appointmentController');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Define Routes
app.post('/api/appointments', appointmentController.createAppointment);
app.get('/api/appointments', appointmentController.getAppointments);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Export the Express app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
