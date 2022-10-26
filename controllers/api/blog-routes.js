const router = require('express').Router();
const { Blog } = require('../../models/Blog');

router.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.findAll();
        res.status(200).json(allBlogs)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;