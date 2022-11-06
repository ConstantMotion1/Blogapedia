const router = require('express').Router();
const { Blog, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const addBlog = await Blog.create({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            user_id: req.session.user_id,
        });
        res.render('homepage', {
            addBlog,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
         await Blog.update(
            {post_title: req.body.updTitle,
            post_content: req.body.updContent,},
            {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json('it worked')
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/:id", async (req, res) => {
    try {
      const upBlogs = await Blog.findByPk(req.params.id);
  
      const updateBlogs = upBlogs.get({ plain: true });
  
      res.render("update", { updateBlogs, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json({message: 'helloworld'});
    }
  });


router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.session.user_id)
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;