var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    path = require('path'),
    jwt = require('jsonwebtoken');

//For generating user uuid
var uuid = require('node-uuid');
//var uuid1 = uuid.v1();

var model = require('../models/user.js');

//secret key for json web token
var superSecret = 'ilovescotchscotchyscotchscotch';

var userTerms = require('../../config/userTerms.js');

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/userTerms', function(req, res) {
    res.send(userTerms);
});

router.get('/user/signup/terms', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    console.log("__dirname : " + __dirname);

    res.render('terms');

});

router.get('/user/signup/selectService', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.render('selectService');
});

router.get('/user/signup/forms', function(req, res, next) {
    console.log('signup/forms');
    res.setHeader('Content-Type', 'text/html');

    res.render('signup_form');
});

router.get('/user/debug/allUsers', function(req, res) {
    model.find(function(err, users) {
        return res.json(users)
    });

});

router.post('/user/signup/insertData', function(req, res, next) {

    console.log('insertData');

    var userData = {
        'userName': req.param('username'),
        'password': req.param('password'),
        'email': req.param('email'),
        'age': req.param('age'),
        'uuid': uuid.v1()
    };

    console.log('userName : ');
    console.log(req.param('username'));
    console.log('model.find');
    model.find({
        userName: req.param('username')
    }, function(err, user) {
        if (user) {
            console.log('username already exists!');
        }
    });

    var user = new model(userData);

    user.save(function(err, user) {
        return res.json({
            success: true
        });
    });
    /*
            console.log('model.findOne');
            model.findOne(userData, function(err, user) {
                if (user) {
                    console.log('data aleray exists!');
                    return res.json({
                        success: false,
                        message: 'Data Already Exists!'
                    });
                } else {
                    var user = new model(userData);

                    user.save(function(err, user) {
                        return res.json({
                            success: true
                        });
                    });
                }
            });
*/
});
