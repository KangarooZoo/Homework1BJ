// this is the main server file
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const initDb = require('./dbinit'); // database stuff
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');

// set port number
const port = process.env.PORT || 3000; // default is 3000
const app = express(); // make express app

// cors stuff
app.use(cors({
  origin: 'http://localhost:8080/',
  credentials: true, // need this for cookies
}));

// parse json
app.use(express.json());
// cookies
app.use(cookieParser());

// routes
app.use('/auth', authRoutes); // auth routes go here
app.use('/api/posts', postRoutes); // post routes

// start server after db is ready
initDb().then(() => {
  // listen on port
  app.listen(port, () => {
    console.log('Server is listening on port ' + port); // log message
  });
}).catch(err => {
  console.error('Error initializing DB', err); // error happened
});