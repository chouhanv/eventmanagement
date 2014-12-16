var locomotive = require('locomotive')
  , Controller = locomotive.Controller,
   Country = require('../models/countries'),
   City    = require('../models/cities');

var dataController = new Controller();

dataController.createCountry = function(req,res) {
var country = this.req.param('country');
var th = this;
Country.create({country : country},function(err,results){
	if (err)
		{
			console.log(err);
			th.res.json({message : "Db Error",status : "false",country : results});
     	}
    else
    {
    	th.res.json({message : "country added successfully",status : "true",country : results});
    }
})

}
dataController.findCountry = function(req,res)
{
  var th = this;
  Country.find({status : false},function(err,results){
    if (err)
      {
         console.log(err);
         th.res.json({message : "Db Error",status : false});
      }
      else{
        console.log(results);
        th.res.json({country : results,status : true});
      }
  })
}
dataController.deleteCountry = function(req,res)
{
  var th = this;
  var id = th.req.param('id');
  Country.update({_id : id},{status : true},function(err,results){
    if (err){
        console.log(err);
        th.res.json({message : "Db Error",status : false});
      }
      else{
        th.res.json({message : "country successfully deleted",country : results,status : true});
      }
  })
}
dataController.createCity = function(req,res){
  var th = this;
  var city = th.req.param('city');
  var countryid = th.req.param('id');
  City.create({city : city,countryid : countryid},function(err,results){
    if (err){
      console.log(err);
      th.res.json({message : "Db Error",status : false});
    }
    else
    {
     th.res.json({message : "City added successfully",status : true,city : results});
    }
  })
}
dataController.findCity = function(req,res){
  var th = this;
  City.find({status : false})
  .populate('countryid')
  .exec(function(err,results){
    if (err){
      console.log(err);
      th.res.json({message : "Db Error",status : false});
    }
    else{
       th.res.json({message : "successfully",status : true,city : results});
    }
  });
}
dataController.deleteCity = function(req,res)
{
  var th = this;
  var id = th.req.param('id');
  City.update({_id : id},{status : true},function(err,results){
    if (err){
        console.log(err);
        th.res.json({message : "Db Error",status : false});
      }
      else{
        th.res.json({message : "country successfully deleted",country : results,status : true});
      }
  })
}
module.exports = dataController;
