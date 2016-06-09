var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({userName : String,
                                  password : String,
                                  email : String,
                                  age : Number});

UserSchema.methods.comparePassword = function(password){
  var user = this;

  console.log('passowrd');
  console.log(password);

  console.log('user.password')
  console.log(user.password);

  if(password == user.password)
    return true;
    else {
      return false;
    }
}
module.exports = mongoose.model('users', UserSchema);
