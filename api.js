
var express    = require('express'),
	mongoose   = require('mongoose'),
	bodyParser = require('body-parser'),
	moment 	   = require('moment'),
	router	   = express.Router();

mongoose.connect('mongodb://localhost:27017/creative');	
var db = mongoose.connection;
var Schema = mongoose.Schema;

// User
var UserSchema = new Schema({
	name:  String,
	lastName:  String,
	company:  String,
	email: String,
	phone: String,	    
	nickname:  String,
	password: String  
});

var User = mongoose.model('User', UserSchema);


var CarSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  patent:  String,
  owner: String,
  car:  String,
  phone: String,
  services: [{
  	date: Date,
  	description: String,
  	price: Number
  }]
});

var Car = mongoose.model('Car', CarSchema);



router.use(bodyParser.json());

router.get('/car', function(req, res) {
	
	Car.findById(req.query._id, function(err, car) {
		if(err) {
			res.send(400, {"result": false});
		} else {
			res.json(car);
		}
	});
});	

router.post('/car/search', function(req, res) {
	Car.findOne({"patent": req.body.patent, "userId": req.body.userId}, function(err, car) {
		// to-do: err always is null, check why. 				
		if(car == null) {
			res.send(400, {"result": false});
		} else {
			res.send(200, car);
		}
	});
});	


router.post('/car/newcar', function(req, res) {	
	var car = new Car(req.body);
	car.save(function(err, car) {
		if(err) {
			res.send(400, {"result": false});
		} else {
			res.json(car);
		};
	});
});

router.post('/car/editcar', function(req, res) {	
	Car.findByIdAndUpdate(
		req.body._id,
		{ patent : req.body.patent, car : req.body.car, owner : req.body.owner, phone : req.body.phone},
		function(err, model) {
			if(err) {
				res.send(400, {"result": false});
			} else {
				res.send(200, {"result": true});
			}	
		}
	);
});

router.post('/car/findall', function(req, res) {
	
	Car.find({}, function(err, cars) {
		res.json(cars);
	});

});

router.post('/car/newservice', function(req, res) {	
	Car.findByIdAndUpdate (
		req.body.carId,
		{$push: {"services" : {date : req.body.date, description : req.body.description, price : req.body.price }}},
		function(err, car) {
			if(err) {
				res.send(400, {"result": false});
			} else {
				servi = car.services[car.services.length-1];
				res.send(200, servi);
			}	
		}
	);
});	

router.post('/car/updateservice', function(req, res) {

	Car.update(
		{'_id': req.body.carId, 'services._id' : req.body._id},
		{$set: {'services.$.date' : req.body.date, 'services.$.description' : req.body.description, 'services.$.price' : req.body.price }},
		function(err, model) {
			if(err) {
				res.send(400, {"result": false});
			} else {
				res.send(200, {"result": true});
			} 	
		}
	);
	
});	

router.post('/car/deleteservice', function(req, res) {	
	Car.update({"_id": req.body.carId}, {$pull : {'services': {'_id' : req.body._id}}}, function(err) {
		if(err) {
			res.send(400, {"result": false});
		} else {
			res.send(200, {"result": true});
		}
	});
});	

router.delete('/car', function(req, res) {	
	Car.remove({"_id": req.query._id}, function(err) {
		if(err) {
			res.send(400, {"result": false});
		} else {
			res.send(200, {"result": true});
		}
	});
});	


router.post('/authenticate', function(req, res) {	
	User.findOne({ nickname: req.body.nickname, password: req.body.password}, function(err, data) {
		res.send(data);
	});
});	

module.exports = router;
