const User = require('../models/user.model')

function getAll(next) {
	User.find({}).exec((error, users) => {
		next(users)
	})
}

function findById(id, next) {
	User.findById({ _id: id}).exec((error, user) => {
		next(user)
	})
}

function findByEmail(email, next) {
	User.findOne({ email: email }).exec((error, user) => {
		next(user)
	})
}

function findByName(name, next) {
	var nameRegExp = '/.*' + name + '.*/'
	User.find({ name: nameRegExp }).exec((error, users) => {
		next(users)
	})
}

function insertUser(data, next) {
	const user = new User({
		name: data.name, 
		email: data.email
	})

	user.save((error, user) => {
		if (error) return next({ status: 304, error: error })

		next({ status: 200, user: user.toClient() })
	})
}

function removeUser(filter, next) {
	User.remove(filter).exec((error, status) => {
		next(status)
	})
}

function updateUser(filter, data, next) {
	User.update(filter, {$set: data }).exec((error, status) => {
		if (error) return next({ status: 304, error: error })

		next({ status: 200, status: status })
	})
}

module.exports = {
	getAll: getAll, 
	findById: findById, 
	findByEmail: findByEmail, 
	findByName: findByName, 
	insertUser: insertUser, 
	removeUser: removeUser, 
	updateUser: updateUser
}