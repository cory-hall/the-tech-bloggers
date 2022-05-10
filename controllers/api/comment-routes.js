const router = require('express').Router();
const { Comment } = require('../../models');
// this helper verifies that a user is logged in
const withAuth = require('../../utils/auth');

// GET all the comments
// GET -- /api/comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// GET one comment by `id` value
// GET -- /api/comments/(number)
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


// POST a comment with withAuth helper
// POST -- /api/comments
router.post('/', withAuth, (req, res) => {
    // check is session is valid
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});


// PUT route to edit a comment based on `id` value
// PUT -- /api/comments/(number)
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
    },
        {
            where: {
                id: req.params.id
            }
        }).then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE route to remove a comment based on `id` value, with withAuth helper
// DELETE -- /api/comments/(number)
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;