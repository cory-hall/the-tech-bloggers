const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
// this helper verifies that the user is logged in
const withAuth = require('../../utils/auth');

// GET all posts
// GET -- /api/posts
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    // sequelize query
    attributes: ['id',
      'title',
      'content',
      'created_at'
    ],
    order: [['created_at', 'DESC']],
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
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

// GET one post based on `id` value
// GET -- /api/posts/(number)
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    // sequelize query
    attributes: ['id',
      'content',
      'title',
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
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST to create a post, with withAuth helper
// POST -- /api/posts
router.post('/', withAuth, (req, res) => {
  // create 1 post
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// PUT to update a post (title and body) based on `id` value, with withAuth helper
// PUT -- /api/posts/(number)
router.put('/:id', withAuth, (req, res) => {
  Post.update({
    title: req.body.title,
    content: req.body.content
  },
    {
      where: {
        id: req.params.id
      }
    }).then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// DELETE a post based on `id` value, with withAuth helper
// DELETE -- /api/posts/(number)
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;