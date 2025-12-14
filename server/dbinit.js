// initialize database tables
const pool = require('./database');

// function to create tables
async function initDb() {
  // create users table
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL
    )`
  );

  // create posts table
  await pool.query(
    `CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      body TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`
  );
  
  console.log('Database tables created!');
}

// export function
module.exports = initDb;