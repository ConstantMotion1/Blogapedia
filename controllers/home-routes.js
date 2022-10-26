const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.findAll();

    const displayBlogs = allBlogs.map((blog) =>
        blog.get({ plain: true })
    );

        res.render('main', {
            displayBlogs,
            loggedIn: req.session.loggedIn,
        });
        res.status(200).json(allBlogs)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;