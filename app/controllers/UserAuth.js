var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    path = require('path'),
    jwt = require('jsonwebtoken');

var model = require('../models/user.js');

//secret key for json web token
var superSecret = 'ilovescotchscotchyscotchscotch';

var userTerms = require('../../config/userTerms.js');

module.exports = function(app) {
    app.use('/', router);
};

// ?username=[username]&password=[password]
router.get('/userAuth/authenticate', function(req, res) {
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
