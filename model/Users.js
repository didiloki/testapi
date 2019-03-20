const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  a_date: {
    type: Date,
    default: Date.now()
  }
});

// Compile model from schema
var User = mongoose.model('User', userSchema);
User.collection.dropIndexes({})
module.exports = User