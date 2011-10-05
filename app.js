
/**
 * Module dependencies.
 */

var express    = require('express'),
    mongoose   = require('mongoose'),
    mongoStore = require('connect-mongodb');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.session({ store: mongoStore(app.set('db-uri')), secret: 'topsecret' }));
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

// Routes

app.get('/', function(req, res){
  var Event = require('models/event.js');
  new Event({title: "blah"}).save();
  res.render('index', {
    title: 'Express'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
