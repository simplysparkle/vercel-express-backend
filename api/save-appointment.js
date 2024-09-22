// api/save-appointment.js

// Use CommonJS syntax if ES Modules are not enabled
const pool = require('../db/db');

module.exports = async (req, res) => {
  const {
    firstName,
    lastName,
    mobileNumber, // Updated to match 'mobile_number'
    email,
    services, // Assuming 'service' column can store an array
    date,
    time,
  } = req.body;

  // Validate input fields
  if (
    !firstName ||
    !lastName ||
    !mobileNumber ||
    !services ||
    !date ||
    !time ||
    !Array.isArray(services)
  ) {
    return res.status(400).json({
      error: 'Invalid input. Ensure all required fields are filled and services is an array',
    });
  }

  try {
    // Insert into the database with array of services
    const query = `
      INSERT INTO appointments (
        first_name,
        last_name,
        mobile_number,
        email,
        service,
        date,
        time
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [firstName, lastName, mobileNumber, email, services, date, time]; // 'services' is an array

    const result = await pool.query(query, values);

    return res.status(201).json({ success: true, appointment: result.rows[0] });
  } catch (error) {
    console.error('Error inserting appointment:', error);
    return res.status(500).json({ error: 'Database error' });
  }
};
