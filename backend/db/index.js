// backend/db/index.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ex: postgres://user:pass@localhost:5432/healthchatbot
  // optional SSL settings for production
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
