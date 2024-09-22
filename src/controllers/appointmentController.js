// src/controllers/appointmentController.js

const appointmentModel = require('../models/appointment');

/**
 * Controller to handle creating a new appointment.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createAppointment = async (req, res) => {
  const appointmentData = req.body;

  // Basic validation (you can enhance this as needed)
  if (
    !appointmentData.first_name ||
    !appointmentData.last_name ||
    !appointmentData.mobile_number ||
    !appointmentData.service ||
    !appointmentData.date ||
    !appointmentData.time
  ) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const newAppointment = await appointmentModel.createAppointment(appointmentData);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment.' });
  }
};

/**
 * Controller to handle retrieving all appointments.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments.' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
