var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  path = require('path'),
  jwt = require('jsonwebtoken');

var model = require('../models/user.js');

//secret key for json web token
var superSecret = 'ilovescotchscotchyscotchscotch';

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index.html');
});

// ?username=[username]&password=[password]
router.get('/userAuth/authenticate', function(req, res) {
  model.findOne({'username' : req.param('userName'), 'password' : req.param('password')}, function(err, user){
    if(err) throw err;

    if(!user){
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    }
    else if(user){
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
      });    }

  });

});

router.get('/userAuth/signup/terms', function(req, res, next){
      res.setHeader('Content-Type', 'text/html');
      console.log("__dirname : " + __dirname);

      res.render('terms');

});

router.get('/userAuth/signup/selectService', function(req, res, next)
{
      res.setHeader('Content-Type', 'text/html');

      res.render('selectService');
});

router.get('/userAuth/signup/forms', function(req,res, next)
{
  console.log('signup/forms');
  res.setHeader('Content-Type', 'text/html');

  res.render('signup_form');
});

router.post('/userAuth/signup/insertData', function(req, res, next){

  console.log('insertData');

  var userData = {
    'userName' : req.param('username'),
    'password' : req.param('password'),
    'email' : req.param('email'),
    'age' : req.param('age')
  };

  model.find({userName : req.param('username')}, function(err, user){
      if(user){
        console.log('username already exists!');
      }
  });

  model.findOne(userData, function(err, user){
      if(user)
      {
        console.log('data aleray exists!');
      }else{
        var user = new model(userData);

        user.save(function(err, user){
            res.json({success :true});
        });
      }
  });

});

//middleware for authentication
router.use('/api',function(req, res, next){

  //get token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token){
    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next(); // make sure we go to the next routes and don't stop here
      }
    });
  }else{
      res.status(403).send({
        success : false,
        message : 'no token provided'
      });
  }

});

router.get('/api/dbTest', function(req, res, next){
  var userData = {
    'useName' : 'parkjaesung',
    'password' : 'codebakery1234',
    'age' : 18
  };

  model.findOne(userData, function(err, user){
      if(user)
      {
        console.log('data already exists!');
      }else{
        var user = new model(userData);

        user.save(function (err, user) {
            //res.send(user);
            res.send("<script> alert('가입되었습니다.'); </script>")
          });

      }
  });

});
