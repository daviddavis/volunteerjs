
/**
 * Module dependencies.
 */

var express    = require('express'),
    mongoose   = require('mongoose'),
    stylus = require('stylus');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.set('db-uri', 'mongodb://localhost/volunteerjs-development');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.set('db-uri', 'mongodb://localhost/volunteerjs-production');
  app.use(express.errorHandler()); 
});

db = mongoose.connect(app.set('db-uri'));
var Event = require('models/event.js');
var Volunteer = require('models/volunteer.js');

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'volunteer.js'
  });
});

app.get("/volunteers", function(req, res) {
  Volunteer.find({}, [], {sort: ['last_name', 'first_name', 'ascending'] }, function(err, records) {
    records = records.map(function(r) {
      return { first_name: r.first_name, last_name: r.last_name, id: r._id };
    });
    res.send(records);
  });
});

app.post('/volunteers', function(req, res) {
  var v = new Volunteer(req.body);
  v.save(function() {
    console.log("Created volunteer");
    var data = v.toObject();
    // TODO: Backbone requires 'id', but can I alias it?
    data.id = data._id;
    res.send(data);
  });
});

app.get("/events", function(req, res) {
  Event.find({}, [], {sort: ['date', 'ascending'] }, function(err, records) {
    records = records.map(function(r) {
      return { title: r.title, date: r.date, id: r._id, volunteer_count: r.volunteer_count, volunteer_ids: r.volunteers };
    });
    res.send(records);
  });
});

app.post('/events', function(req, res) {
  params = {title: req.body.title, date: req.body.date, volunteers: req.body.volunteers.split(",")}
  console.log(params)
  var e = new Event(params);
  e.save(function(err) {
    console.log(err);
    var data = e.toObject();
    // TODO: Backbone requires 'id', but can I alias it?
    data.id = data._id;
    res.send(data);
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
