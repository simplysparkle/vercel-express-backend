// api/retrieve-appointment-details.js

const pool = require('../db/db');

module.exports = async (req, res) => {
      // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');  // For development, allow all origins. For production, specify your frontend domain.
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Appointment ID is required' });
  }

  try {
    const query = 'SELECT * FROM appointments WHERE id = $1';
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
