import pool from '../db/db';

export default async (req, res) => {
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
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }
};
