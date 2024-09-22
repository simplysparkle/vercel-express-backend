const pool = require('../db/db');

module.exports = async (req, res) => {
      // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');  // For development, allow all origins. For production, specify your frontend domain.
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  try {
    // Query to fetch all appointments from the database
    const query = 'SELECT * FROM appointments';
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No appointments found' });
    }

    // Return all appointments
    return res.status(200).json({ appointments: result.rows });
  } catch (error) {
    console.error('Error retrieving appointments:', error);
    return res.status(500).json({ error: 'Database error' });
  }
};
