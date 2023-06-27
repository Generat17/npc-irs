const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')

router.post('/', userController.createUser)
router.get('/count', userController.getCountUsers)
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/', userController.deleteUsers)
router.delete('/:id', userController.deleteUser)

module.exports = router