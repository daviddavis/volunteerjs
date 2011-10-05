var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
  'title': { type: String, index: true },
  'date': Date
});

module.exports = mongoose.model('Event', eventSchema);