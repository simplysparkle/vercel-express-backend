import pool from '../db/db';

export default async (req, res) => {
  const { firstName, lastName, mobile, email, services, date, time } = req.body;

  // Validate input fields
  if (!firstName || !lastName || !mobile || !services || !date || !time || !Array.isArray(services)) {
    return res.status(400).json({ error: 'Invalid input, check all required fields and ensure services is an array' });
  }

  try {
    // Insert into the database with array of services
    const query = `
      INSERT INTO appointments (first_name, last_name, mobile, email, services, appointment_date, appointment_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [firstName, lastName, mobile, email, services, date, time]; // services is an array
    const result = await pool.query(query, values);

    return res.status(201).json({ success: true, appointment: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }
};
