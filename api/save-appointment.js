const pool = require('../db/db');
const { format } = require('date-fns'); // Importing date-fns for date formatting

module.exports = async (req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');  // For development, allow all origins. For production, specify your frontend domain.
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // End the response for preflight requests
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    services,
    date,
    time,
  } = req.body;

  // Validate input fields
  if (!firstName || !lastName || !mobileNumber || !services || !date || !time || !Array.isArray(services)) {
    return res.status(400).json({
      error: 'Invalid input. Ensure all required fields are filled and services is an array',
    });
  }

  try {
    // Ensure the date is formatted to YYYY-MM-DD
    const formattedDate = format(new Date(date), 'yyyy-MM-dd'); // Formatting the date in the backend

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
    const values = [firstName, lastName, mobileNumber, email, services, formattedDate, time]; // Insert the formatted date
    const result = await pool.query(query, values);

    return res.status(201).json({ success: true, appointment: result.rows[0] });
  } catch (error) {
    console.error('Error inserting appointment:', error);
    return res.status(500).json({ error: 'Database error' });
  }
};
