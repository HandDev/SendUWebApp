//이용약관, 공지사항 등을 제공
var express = require('express'),
    router = express.Router();

//secret key for json web token
var superSecret = 'ilovescotchscotchyscotchscotch';

var userTerms = require('../../config/userTerms.js');
var templates = require('../../config/templates.js');

var images = require('../../config/images');

module.exports = function(app) {
    app.use('/resources', router);
};

router.get('/images/main', function(req, res){
   res.json(images.main);
});

router.get('/userTerms', function(req, res) {
    console.log(userTerms);
    res.setHeader('Content-Type', 'application/json');
    res.send(userTerms, null, 3);
});

router.get('/templates', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(templates);
});

//echo address info
router.post('/address', function (req,res) {
    var address = req.param('address');
    res.send(address);
})
