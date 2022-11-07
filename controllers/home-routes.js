const router = require("express").Router();
const { Blog, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.findAll({include: [{ model: User }]});

    const displayBlogs = allBlogs.map((blog) => blog.get({ plain: true }));

    res.render("homepage", { displayBlogs, loggedIn: req.session.loggedIn, username: req.session.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/update/:id", async (req, res) => {
  try {
    const upBlogs = await Blog.findByPk(req.params.id);

    const updateBlogs = upBlogs.get({ plain: true });

    res.render("update", { updateBlogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({message: 'helloworld'});
  }
});

router.get("/viewblog/:id", async (req, res) => {
  try {
    const cmtBlogs = await Blog.findByPk(req.params.id, {include:[{ model: Comment }, { model: User}]});

    const commentBlogs = cmtBlogs.get({ plain: true });

    res.render("viewblog", { commentBlogs, loggedIn: req.session.loggedIn, post_comment:req.body.post_comment });
  } catch (err) {
    res.status(500).json({message: 'helloworld'});
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const userBlogs = await Blog.findAll({
      ...req.body,
      user_id: req.session.user_id,
      include: [{ model: User }]
    }
    );

    const displayUserBlogs = userBlogs.map((blog) => blog.get({ plain: true }));
    console.log(displayUserBlogs)

    res.render("dashboard", {
      blog: displayUserBlogs,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
      const addComment = await Comment.create({
          post_title: req.body.post_title,
          post_content: req.body.post_content,
          user_id: req.session.user_id,
      });
      res.render('homepage', {
          addComment,
          loggedIn: req.session.loggedIn,
      });
  } catch (err) {
      res.status(500).json(err)
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
  console.log("work");
});

module.exports = router;
