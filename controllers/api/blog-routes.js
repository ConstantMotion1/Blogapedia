const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const addBlog = await Blog.create({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
        });
        res.render('userpage', {
            addBlog,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;