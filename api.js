
var express    = require('express'),
	mongoose   = require('mongoose'),
	bodyParser = require('body-parser'),
	router	   = express.Router();


mongoose.connect('mongodb://localhost:27017/creative');	
var db = mongoose.connection;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:  String,
  lastName: String,
  age: String,  
});
var User = mongoose.model('User', UserSchema);

router.use(bodyParser.json());

router.get('/user', function(req, res) {
	res.json("testeando");
	/*
	User.find(function (err, data) {
	  if (err) return console.error(err);
	  res.json(data);
	})
	*/
});


router.post('/user', function(req, res) {
	var user = new User({ name: req.body.nombre, lastName : req.body.apellido, age : req.body.edad});
	user.save();
});

module.exports = router;