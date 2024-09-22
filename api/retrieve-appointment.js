const pool = require('../db/db');

module.exports = async (req, res) => {
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
