// server.js
//==============================================================================
// INCLUDE REQUIRED PACKAGES
//==============================================================================
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear       = require('./app/models/bear')


// configure app to use bodyParser() to
// get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to remote DB in tutorial
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

var port = process.env.PORT || 8080;        // set our port

//==============================================================================
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//Do this for handling all routes
router.use(function(req, res, next){
	console.log("You've hit a route");
	next(); //proceed to more routes
});

router.get('/', function(req, res) {
    res.json({ message: 'Hello World API' });   
});

router.route('/bears')

	.post(function(req, res){
		console.log("post req");
		var bear = new Bear();
		bear.name = req.body.name; //name from post body
		console.log(req.body.name);
		res.json(bear);
		bear.save(function(err) {
			if (err)
				res.send(err); //tell response to send error

			res.json({ message: 'Bear with name was made successfully' });
		});

	})

	.get(function(req, res){
		console.log("get req");
		Bear.find(function(err, bears){
			if (err)
				res.send(err);

			res.json(bears);
		});

	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//=============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on Port: ' + port);
