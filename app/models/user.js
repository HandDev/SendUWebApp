var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    birth: String,
    address : String,
    numAddress : String,
    uuid: String,
    phone : String
});
module.exports = mongoose.model('users', UserSchema);
