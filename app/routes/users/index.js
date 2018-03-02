const userRoutes = require('express').Router(), 
userController = require('../../controllers/users.controller')

// Apply same middleware for these paths
userRoutes.use(['/', '/:userid'], userController.log, userController.logSuccess)

userRoutes.get('/', userController.getAll)
userRoutes.get('/:userid', userController.getUser)
userRoutes.post('/new', userController.add)
userRoutes.put('/edit/:userid', userController.update)
userRoutes.delete('/remove/:userid', userController.remove)
userRoutes.post('/search', userController.search)

module.exports = userRoutes