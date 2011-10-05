
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

app.post('/volunteers.:format?', function(req, res) {
  var v = new Volunteer(req.body);
  v.save(function() {
    switch (req.params.format) {
      case 'json':
        console.log("Created volunteer. Returning json.");
        var data = v.toObject();
        // TODO: Backbone requires 'id', but can I alias it?
        data.id = data._id;
        res.send(data);
      break;

      default:
        console.log("Created volunteer. Redirecting.");
        //req.flash('info', 'Volunteer created');
        res.redirect('/');
    }
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
