const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true
	},
	lists: {
		type: Array
	},
});

module.exports = mongoose.model('List', listSchema, 'List');