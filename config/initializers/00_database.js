/*global module, require, console*/
/*jslint nomen: false*/
// This module connects the `mongoose` ORM to the `Mongo` DB. 
var mongoose = require('mongoose');
module.exports = function () {
	mongoose.connect('mongodb://localhost:27017/eventmanagement');
	console.log('MongoDB Connected');
};