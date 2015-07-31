// bear.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Define schema of the Bear object
var BearSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Bear', BearSchema);