const express = require('express');
const diary = require('../module/diary');

const router = express.Router();

// Show all blogs
router.get('/', (req, res) => {
    diary.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
});

// Create a new blog
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// Post a new blog
router.post('/', (req, res) => {
    // console.log(req.body);
    const newDiary = new diary(req.body);
    newDiary.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
});

// Get a single blog by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    diary.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result });
        })
        .catch((err) => {
            res.render('404', { title: 'Blog not found' });
        })
});

// Delete a single blog
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    diary.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;