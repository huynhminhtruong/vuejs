var User = require('../models/user.model'), 
dbquery = require('../databasequeries/user.query'), 
mongoose = require('mongoose')
// uploads = multer({dest: './public/uploads'}).single('file')

function getUsers(req, res, next) {
	dbquery.getAll((users) => {
		usersToClient(users, (data) => {
			res.status(200).json(data)
		})
	})
}

function usersToClient(users, next) {
	var length = users.length

	while(length > 0) {
		users[users.length - length] = users[users.length - length].toClient()
		length--
	}

	next(users)
}

function getUser(req, res, next) {
	dbquery.findById(mongoose.Types.ObjectId(req.params.userid), (user) => {
		res.status(200).json(user.toClient())
	})
}

function addUser(req, res, next) {
	dbquery.insertUser({
		name: req.body.name, 
		email: req.body.email
	}, (data) => {
		if (data.status != 200 ) return res.status(500).json(data.error)
			
		res.status(200).json(data)
	})
}

function updateUser(req, res, next) {
	var filter = { _id: mongoose.Types.ObjectId(req.params.userid) }, 
	data = { name: req.body.name }

	dbquery.updateUser(filter, data, (data) => {
		if (data.status != 200) return res.status(500).json(data.error)

		getUsers(req, res, () => {
			console.log('update user')
		})
	})
}

function removeUser(req, res, next) {
	dbquery.removeUser({ _id: mongoose.Types.ObjectId(req.params.userid) }, (status) => {
		getUsers(req, res, () => {
			console.log('remove user')
		})
	})
}

function searchByEmail(req, res, next) {
	dbquery.findByEmail(req.body.email, (user) => {
		res.status(200).json({ message: 'search user by email', data: user })
	})
}

function log(req, res, next) {
	console.log('Show log 1')
	next()
}

function logSuccess(req, res, next) {
	console.log('Show success log')
	next()
}

function render(req, res, next) {
	res.status(200).json({ template: 'Render template' })
}

module.exports = {
	getAll: getUsers, 
	getUser: getUser, 
	add: addUser, 
	update: updateUser, 
	remove: removeUser, 
	search: searchByEmail, 
	log: log, 
	logSuccess: logSuccess, 
	renderTemplate: render
}