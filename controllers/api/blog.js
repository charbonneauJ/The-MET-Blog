
const express = require('express');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.status(401).send({ error: 'You must be logged in to view this page.' });
    }
}


router.get('/public', (req, res) => {
    res.send('This is a public blog post.');
});


router.get('/private', ensureAuthenticated, (req, res) => {
    res.send('This is a private blog post that only authenticated users can see.');
});


router.post('/new', ensureAuthenticated, (req, res) => {
    const { title, content } = req.body;

    
    Post.create({
        title,
        content,
        userId: req.session.userId
    })
    .then(post => res.status(201).json(post))
    .catch(error => res.status(500).json({ error: 'Error creating post' }));
});

module.exports = router;