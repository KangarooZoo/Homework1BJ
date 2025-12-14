// database connection
const { Pool } = require('pg');

// create pool with database settings
const pool = new Pool({
  user: 'postgres', // username
  password: 'Analyyscool', // password
  database: 'testWad', // database name
  host: 'localhost', // host
  port: '5433', // port number
});

// export pool
module.exports = pool;