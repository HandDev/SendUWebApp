/**
 * Created by parkjaesung on 2017. 1. 15..
 */
var express = require('express'),
    router = express.Router(),
    order = require('../models/order');

module.exports = function (app) {
    app.use('/orders', router);
};

router.get('/:email', function (req, res) {
    var email = req.params.email;

    order.find({
        'email': email
    }, function (err, rows) {
        if (err) {
            return res.status(500).send("Internal Server Err");
        } else {
            return res.status(200).send(rows);
        }
    });
});

router.post('/:email', function (req, res) {
    var newOrderObj = {
        'email': req.params.email,
        'orderUUID': req.body.orderUUID,
        'orderDate': req.body.orderDate,
        'receiverName': req.body.receiverName,
        'address': req.body.address,
        'numAddress': req.body.numAddress,
        'text': req.body.text,
        'img': req.body.img
    };

    var newOrder = new model(newOrderObj);

    newOrder.save(function(err, user){
        if(err){
            return res.status(500).send('Internal Server err');
        }else{
            return res.status(200).json(newOrder);
        }
    });
});
