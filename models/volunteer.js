var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var volunteerSchema = new Schema({
  'first_name': String,
  'last_name':  String,
  'phone':      String,
  'email':      String
});

module.exports = mongoose.model('Volunteer', volunteerSchema);