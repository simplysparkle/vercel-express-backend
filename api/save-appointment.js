// api/save-appointment.js

const pool = require('../db/db');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://localhost:5173'); // Replace with your frontend domain or use '*' for development
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const {
    firstName,
    lastName,
    mobileNumber,
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
      error:
        'Invalid input. Ensure all required fields are filled and services is an array',
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
    const values = [
      firstName,
      lastName,
      mobileNumber,
      email,
      services, // 'services' is an array
      date,
      time,
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({ success: true, appointment: result.rows[0] });
  } catch (error) {
    console.error('Error inserting appointment:', error);
    return res.status(500).json({ error: 'Database error' });
  }
};
