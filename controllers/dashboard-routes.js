const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// helper that verifies that user is logged in
const withAuth = require('../utils/auth');

// GET all posts for user for dashboard view, with withAuth helper
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      // get the user_id from the session user_id
      user_id: req.session.user_id
    },
    // sequelize query
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET one post from user to edit based on `id` value, with withAuth helper
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    // sequelize query
    attributes: ['id',
      'title',
      'content',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // serialize data before passing to template
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


// redirect users to new post after signing up
router.get('/new', (req, res) => {
  res.render('new-post');
});


module.exports = router;