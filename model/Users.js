const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: {type: String, required : true},
  lastname: {type: String, required : true},
  email: {type: String, required : true},
  a_date: {type: Date, default : Date.now()}
});

// Compile model from schema
var user = mongoose.model('user', userSchema );

module.exports = user