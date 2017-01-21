/**
 * Created by parkjaesung on 2017. 1. 15..
 */
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    email : String,
    orderUUID : String,
    orderDate : String,
    receiverName : String,
    address : String,
    numAddress : String,
    text : String,
    img : String
});

module.exports = mongoose.model('order', UserSchema);