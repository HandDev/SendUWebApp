var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    userName: String,
    password: String,
    emaddil: String,
    age: Number,
    uuid: String
});
module.exports = mongoose.model('users', UserSchema);
