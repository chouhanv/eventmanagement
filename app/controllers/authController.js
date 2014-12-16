var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var authController = new Controller();

authController.login = function() {
  var th = this;
  var email = th.req.body.email; 
  var password = th.req.body.password;
 console.log(email,password);
  if (email=="admin@gmail.com")
 	{   console.log('email',email);
 		if(password == "admin")
 		{
          th.res.json({message : "success"});
 	    }
		else
		{
			th.res.json({message : "Your password is incorrect"});
		}
 	}
 	else
 	{
       th.res.json({message : "Your email is incorrect"});
 	}
}
 authController.home = function(req,res) {
	var th = this;
	th.render();
}

module.exports = authController;
