/**
 * Created by parkjaesung on 2017. 1. 8..
 */
var express = require('express'),
    router = express.Router(),
    model = require('../models/user');

module.exports = function(app) {
    app.use('/debug', router);
};

router.get('/users', function(req ,res){
    model.find(function(err, users) {
        return res.json(users)
    });
});