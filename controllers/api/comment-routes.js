const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const precommentdata = await Comment.findAll( res.json(commentdata) );
        const commentdata = precommentdata.map((blog) => blog.get({ plain: true }));
    } catch (err) {
        res.status(500).json(err)
    }
  });

  router.get('/:id', async (req, res) => {
    console.log('high')
    console.log(req)
    try {
        const commentdata = await Comment.findAll( {
            where: {
                id: req.params.id
            }
        } )
        res.json(commentdata)
       
    } catch (err) {
        res.status(500).json(err)
    }
  });

router.post('/', async (req, res) => {
    console.log('high')
    try {
        console.log(req)
        const precommentdata = await Comment.create({
            post_comment: req.body.post_comment,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        });
        console.log(precommentdata)
        const commentdata = precommentdata.get({ plain: true });
        res.json(commentdata);
    } catch (err) {
        res.status(500).json(err)
    }
  });

  module.exports = router;