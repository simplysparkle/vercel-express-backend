const { Pool } = require('pg');

// Pool configuration using Vercel's PostgreSQL environment variable
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL // Vercel provides this automatically
});

module.exports = pool;
