var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , adminUsers = require('../models/admin.js');
var adminController = new Controller();

adminController.login = function() {
  this.title = 'Locomotive';
  this.render();
}

adminController.create = function() {
  	var th = this;
  	var username = th.req.param("username");
  	var email = th.req.param("email");
  	var password = th.req.param("password");
  	adminUsers.Create(username, email, password, function(err, user){
  		console.log('user',user);
  		if(err) th.res.json({success : false, message : "An error in processing the request. Please try again."});
  		else th.res.json({success : true, message : "Admin user created successfully.", data : user});
  	});	
}

adminController.login = function() {
  	var th = this;
  	var username = th.req.param("username");
  	var email = th.req.param("email");
  	var password = th.req.param("password");
  	adminUsers.Login(username, password, function(err, user){
  		console.log('user',user);
  		// if(err) th.res.json({success : false, message : "An error in processing the request. Please try again."});
  		// else th.res.json({success : true, message : "Admin user created successfully.", data : user});
  	});	
}

module.exports = adminController;