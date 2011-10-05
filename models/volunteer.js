var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var volunteerSchema = new Schema({
  'first_name': String,
  'last_name':  String,
  'phone':      String,
  'email':      String,
  'events':     [{type: Schema.ObjectId, ref: 'Event'}]
});

volunteerSchema.virtual('full_name').get(function () {
  return this.first_name + " " + this.last_name;
});

module.exports = mongoose.model('Volunteer', volunteerSchema);