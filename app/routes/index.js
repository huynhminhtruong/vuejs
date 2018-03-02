const routes = require('express').Router(), 
root = './views/', 
mainController = require('../controllers/main.controller')

routes.use('/users', require('./users'))
routes.get('/', mainController.showHome)

module.exports = routes