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
    app.use('/', router);
};

//middleware for authentication
router.use('/api', function(req, res, next) {
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