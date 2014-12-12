// Local declaration of the variables
var mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    adminusersSchema = new Schema({}, {strict: false});

adminusersSchema.statics.Create = function (username, email, password, callback) {
    var s = crypto.randomBytes(16).toString('base64');
    var salt = new Buffer(s, 'base64');
    var eyncPwd = crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    this.create({ username: username, email: email, password: eyncPwd, salt : salt } , function (err, user) {
        if (err) callback(err, true, null);
        else callback(null, true, user);
    });
}

adminusersSchema.statics.Login = function (username, password, callback) {
  this.findOne({username : username}, function(err, user){
    if(user)
    {
      var eyncPwd = crypto.pbkdf2Sync(password, user[0].salt, 10000, 64).toString('base64');
      if(password === eyncPwd) 
      {
        return user;
      }
      else
      {
        return null;
      }
    }

  });


  var s = crypto.randomBytes(16).toString('base64');
  var salt = new Buffer(s, 'base64');
  
  console.log('eyncPwd',eyncPwd);

}
var adminusers = mongoose.model('adminusers', adminusersSchema, 'adminusers');
module.exports = adminusers;
