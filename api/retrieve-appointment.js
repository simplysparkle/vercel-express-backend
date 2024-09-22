// api/retrieve-appointment-details.js

const pool = require('../db/db');

module.exports = async (req, res) => {
  try {
    const query = 'SELECT * FROM appointments';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    return res.status(200).json({ appointment: result.rows[0] });
  } catch (error) {
    console.error('Error retrieving appointment:', error);
    return res.status(500).json({ error: 'Database error' });
  }
};
