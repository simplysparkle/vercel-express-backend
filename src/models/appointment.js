// src/models/appointment.js

const pool = require('../config/db');

/**
 * Creates a new appointment in the database.
 * @param {Object} appointmentData - The appointment details.
 * @returns {Object} - The newly created appointment.
 */
const createAppointment = async (appointmentData) => {
  const {
    first_name,
    last_name,
    mobile_number,
    email,
    service,
    date,
    time,
  } = appointmentData;

  const query = `
    INSERT INTO appointments 
      (first_name, last_name, mobile_number, email, service, date, time) 
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    first_name,
    last_name,
    mobile_number,
    email,
    service,
    date,
    time,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

/**
 * Retrieves all appointments from the database.
 * @returns {Array} - An array of appointments.
 */
const getAllAppointments = async () => {
  const query = `
    SELECT * FROM appointments
    ORDER BY created_at DESC;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
};
