// src/routes/appointments.js

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route to create a new appointment
router.post('/', appointmentController.createAppointment);

// Route to retrieve all appointments
router.get('/', appointmentController.getAppointments);

module.exports = router;
