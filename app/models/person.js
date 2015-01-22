var mongoose = require('mongoose');

// person model

module.exports = mongoose.model('person', {
	name : String,
	familyNumber : Number,
	emailAddress : String
});