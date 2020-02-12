const express = require('express');
const { body } = require('express-validator/check');
const feedController = require('../controllers/feed');
const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post(
  '/post',
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

router.get('/post/:postId', feedController.getPost);

// PUT /feed/post/postID
router.put(
  '/post/:postId',
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);

// DELETE /feed/post/postID
router.delete('/post/:postId', feedController.deletePost);

module.exports = router;
