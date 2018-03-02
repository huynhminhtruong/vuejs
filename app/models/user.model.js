var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var db = mongoose.connect('mongodb://localhost/socketio')

var UserSchema = new Schema({
	name: {
		type: String, 
		trim: true
	}, 
	email: {
		type: String, 
		trim: true
	}, 
	avatar: {
		type: String, 
		trim: true
	}
})

UserSchema.methods.toClient = function() {
	return {
		id: this._id, 
		name: this.name, 
		email: this.email
	}
}

module.exports = mongoose.model('User', UserSchema)