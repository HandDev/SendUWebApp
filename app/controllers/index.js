/**
 * Created by parkjaesung on 2017. 1. 8..
 */
var express = require('express'),
    router = express.Router();

module.exports = function(app){
    app.use('/', router);
};

router.get('/', function(req, res){
   res.render('index.html');
});