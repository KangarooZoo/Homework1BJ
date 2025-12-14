// routes for posts
const express = require('express');
const pool = require('./database'); // database
const { authMiddleware } = require('./authMiddleware'); // auth check

const router = express.Router();

// use auth middleware for all routes
router.use(authMiddleware);

// get all posts
router.get('/', async (req, res) => {
  try {
    // get all posts from database
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    // send posts back
    res.json(result.rows);
  } catch (err) {
    // error happened
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get one post by id
router.get('/:id', async (req, res) => {
  try {
    // get id from url
    const id = req.params.id;
    
    // find post in database
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    
    // check if post exists
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    
    // send post back
    res.json(result.rows[0]);
  } catch (err) {
    // error
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// create new post
router.post('/', async (req, res) => {
  try {
    // get body from request
    const { body } = req.body;
    
    // check if body exists
    if (!body) {
      return res.status(400).json({ message: 'Body required' });
    }

    // insert into database
    const result = await pool.query(
      'INSERT INTO posts (body) VALUES ($1) RETURNING *',
      [body]
    );
    
    // send new post back
    res.json(result.rows[0]);
  } catch (err) {
    // error
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// update post
router.put('/:id', async (req, res) => {
  try {
    // get body and id
    const { body } = req.body;
    const id = req.params.id;
    
    // update in database
    const result = await pool.query(
      'UPDATE posts SET body = $1 WHERE id = $2 RETURNING *',
      [body, id]
    );
    
    // check if post was found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    
    // send updated post
    res.json(result.rows[0]);
  } catch (err) {
    // error
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete one post
router.delete('/:id', async (req, res) => {
  try {
    // get id
    const id = req.params.id;
    
    // delete from database
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    
    // send success message
    res.json({ message: 'Deleted' });
  } catch (err) {
    // error
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete all posts
router.delete('/', async (req, res) => {
  try {
    // delete everything
    await pool.query('DELETE FROM posts');
    
    // send message
    res.json({ message: 'All posts deleted' });
  } catch (err) {
    // error
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// export router
module.exports = router;