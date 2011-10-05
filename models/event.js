var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
  'title': { type: String, index: true },
  'date': Date,
  'volunteers': [{type: Schema.ObjectId, ref: 'Volunteer'}]
});

eventSchema.virtual("volunteer_count").get(function() {
  return this.volunteers ? this.volunteers.length : 0;
});

module.exports = mongoose.model('Event', eventSchema);