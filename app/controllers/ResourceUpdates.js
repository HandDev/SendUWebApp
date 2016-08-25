//이용약관, 공지사항 등을 제공
var express = require('express'),
    router = express.Router();

//secret key for json web token
var superSecret = 'ilovescotchscotchyscotchscotch';

var userTerms = require('../../config/userTerms.js');
var templates = require('../../config/templates.js');

module.exports = function(app) {
    app.use('/', router);
};

router.get('/resources/userTerms', function(req, res) {
    console.log(userTerms);
    res.setHeader('Content-Type', 'application/json');
    res.send(userTerms, null, 3);
});

router.get('/resources/templates', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(templates);
});

//echo address info
router.post('/resources/address', function (req,res) {
    var address = req.param('address');
    res.send(address);
})
