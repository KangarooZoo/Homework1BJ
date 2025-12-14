// authentication routes
const express = require('express');
const bcrypt = require('bcrypt'); // for hashing passwords
const jwt = require('jsonwebtoken'); // for tokens
const pool = require('./database'); // database connection
const { JWT_SECRET } = require('./authMiddleware'); // secret key

const router = express.Router();
const SALT_ROUNDS = 10; // how many times to hash

// signup route
router.post('/signup', async (req, res) => {
  try {
    // get email and password from request
    const { email, password } = req.body;
    
    // check if they provided email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // check if user already exists
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      // user exists already
      return res.status(409).json({ message: 'User already exists' });
    }

    // hash the password
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    
    // insert new user
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, hash]
    );

    // get the user from result
    const user = result.rows[0];
    
    // make a token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

    // send cookie and response
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .json({ message: 'Signup successful' });
  } catch (err) {
    // something went wrong
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    // get email and password
    const { email, password } = req.body;
    
    // find user in database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    // check if user exists
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // get user from result
    const user = result.rows[0];
    
    // check password
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // make token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

    // send cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .json({ message: 'Login successful' });
  } catch (err) {
    // error happened
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// check if authenticated
router.get('/authenticate', (req, res) => {
  // get token
  const token = req.cookies.token;
  
  // no token means not authenticated
  if (!token) {
    return res.json({ authenticated: false });
  }

  // verify token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    // if error then not authenticated
    if (err) {
      return res.json({ authenticated: false });
    }
    // authenticated!
    res.json({ authenticated: true, user });
  });
});

// logout
router.post('/logout', (req, res) => {
  // clear the cookie
  res.clearCookie('token').json({ message: 'Logged out' });
});

// export router
module.exports = router;