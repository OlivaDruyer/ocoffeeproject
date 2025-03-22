// const pg = require('pg');

// const client = new pg.Client(process.env.PG_URL);

// client.connect(),

// module.exports = client;

require('dotenv').config();
const { Pool } = require('pg');

// Configuration du pool de connexion
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
