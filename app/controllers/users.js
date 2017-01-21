var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    path = require('path'),
    jwt = require('jsonwebtoken');

var model = require('../models/user.js');

//secret key for json web token
var superSecret = 'ilovescotchscotchyscotchscotch';

module.exports = function(app) {
    app.use('/users', router);
};

// ?username=[username]&password=[password]
router.get('/signin', function(req, res) {
        model.findOne({
            'email': req.param('email'),
            'password': req.param('password')
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                console.log('exists');
                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, superSecret, {
                    expiresIn: '24h' // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        });

    });

router.post('/signup', function(req, res, next){
    console.log('insertData');

    var userData = {
        'userName': req.param('username'),
        'password': req.param('password'),
        'email': req.param('email'),
        'birth': req.param('birth'),
        'numAddress' : req.param('numaddress'),
        'address' : req.param('address'),
        'uuid': req.param('uuid'),
        'phone' : req.param('phone')
    };

    console.log('userName : ');
    console.log(req.param('username'));
    console.log('model.find');
    model.findOne({
        email: req.param('email')
    }, function(err, user) {

        if (user) {
            console.log('user info : ', user);            console.log('email already exists!');
            return res.status(409).json({
                success : false,
                message : 'Email already exists!'
            });
        }else{
            var user = new model(userData);

            user.save(function(err, user) {
                return res.status(201).json({
                    success: true
                });
            });
        }
    });
});

/*
//middleware for authentication
router.use('/', function(req, res, next) {
    //get token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, superSecret, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next(); // make sure we go to the next routes and don't stop here
            }
        });
    } else {
        res.status(403).send({
            success: false,
            message: 'no token provided'
        });
    }

});
*/

//q=[email]
router.get('/', function(req, res){

    console.log('get users info');

	var email = req.query.q;

        console.log('search user info email : ', email);

        model.findOne({
            email : email
        }, function(err, user){
            if(err) throw err;

            if(user){
                return res.status(200).json(user);
            }else{
                return res.status(404).send('not found');
            }
        });
});

router.post('/:email/address', function(req, res){
    var email = req.params.Email;

    console.log('add address for user : ', email);

    model.find({
        email: req.params.Email
    }, function(err, user){
        if(err) throw err;

        user.address = req.param('address');
        user.numAddress = req.param('numAddress');

        user.save(function(err){
           if(err) throw err;
        });
    });
});

router.get('/api/dbTest', function(req, res, next) {
    var userData = {
        'useName': 'parkjaesung',
        'password': 'codebakery1234',
        'age': 18
    };

    model.findOne(userData, function(err, user) {
        if (user) {
            console.log('data already exists!');
        } else {
            var user = new model(userData);

            user.save(function(err, user) {
                //res.send(user);
                res.send("<script> alert('가입되었습니다.'); </script>")
            });

        }
    });

});
