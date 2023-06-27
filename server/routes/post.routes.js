const Router = require('express')
const router = new Router()
const postController = require('../controllers/post.controller')

router.post('/', postController.createPost)
router.get('/', postController.getPosts)
router.get('/:id', postController.getPost)
router.put('/:id', postController.updatePost)
router.delete('/', postController.deletePosts)
router.delete('/:id', postController.deletePost)

module.exports = router