const db = require('../config/db');

const Appointment = {
  create: async (appointmentData) => {
    const { first_name, last_name, mobile_number, email, service, date, time } = appointmentData;
    const query = `
      INSERT INTO appointments (first_name, last_name, mobile_number, email, service, date, time)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [first_name, last_name, mobile_number, email, service, date, time];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  getAll: async () => {
    const query = 'SELECT * FROM appointments ORDER BY date, time';
    const { rows } = await db.query(query);
    return rows;
  }
};

module.exports = Appointment;
