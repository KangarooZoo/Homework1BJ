// middleware for checking if user is logged in
const jwt = require('jsonwebtoken');

// secret key for tokens
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // default secret

// check authentication
function authMiddleware(req, res, next) {
  // get token from cookie
  const token = req.cookies.token;
  
  // check if token exists
  if (!token) {
    // no token means not logged in
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    // if error then token is bad
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // put user info in request
    req.user = user;
    // go to next thing
    next();
  });
}

// export stuff
module.exports = { authMiddleware, JWT_SECRET };