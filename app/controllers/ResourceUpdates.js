//이용약관, 공지사항 등을 제공
var express = require('express'),
    router = express.Router();

//secret key for json web token
var superSecret = 'ilovescotchscotchyscotchscotch';

var userTerms = require('../../config/userTerms.js');

module.exports = function(app) {
    app.use('/', router);
};

router.get('/resources/userTerms', function(res, req) {
    res.send(userTerms);
});
