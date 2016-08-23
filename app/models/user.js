var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    birth: String,
    address : String,
    uuid: String
});
module.exports = mongoose.model('users', UserSchema);
