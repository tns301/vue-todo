const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		min: 6
	},
	lastName: {
		type: String,
		required: true,
		min: 6
	},
	email: {
		type: String,
		required: true,
		min: 6
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 2048
	},
	avatar: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('User', userSchema, 'User');