var locomotive = require('locomotive')
  , Controller = locomotive.Controller,
   Country = require('../models/countries'),
   City    = require('../models/cities'),
   Category = require('../models/categories'),
   User      = require('../models/users'),
   Event      = require('../models/events');

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
  Country.find({},function(err,results){
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
  Country.remove({_id : id},function(err,results){
    if (err){
        console.log(err);
        th.res.json({message : "Db Error",status : false});
      }
      else{
        City.remove({countryid : id},function(err,results){
          if (err){
                th.res.json({message : "Db Error",status : false});
          }
          else{
            th.res.json({message : "country successfully deleted",country : results,status : true});
          }
        })
      }
  })
}
dataController.editCountry = function(req,res)
{
  var th = this;
  var country = th.req.param('country');
  var id      = th.req.param('id');
  Country.update({_id : id},{country : country},function(err,results){
    if (err){
      console.log(err);
      th.res.json({message : "Db Error",status : false});
    }
    else{
      th.res.json({message : "Country Updated successfully",status : true,country : results});
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
  City.find({})
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
  City.remove({_id : id},function(err,results){
    if (err){
        console.log(err);
        th.res.json({message : "Db Error",status : false});
      }
      else{
        th.res.json({message : "country successfully deleted",country : results,status : true});
      }
  })
}
dataController.editCity = function(req,res)
{
 var th = this;
  var city = th.req.param('city');
  var id      = th.req.param('id');
  var countryid = th.req.param('countryid');
  City.update({_id : id},{city : city,countryid :countryid},function(err,results){
    if (err){
      console.log(err);
      th.res.json({message : "Db Error",status : false});
    }
    else{
      th.res.json({message : "City Updated successfully",status : true,country : results});
    }
  })
}
dataController.createCategory = function(req,res) {
var category = this.req.param('category');
var th = this;
Category.create({category : category},function(err,results){
  if (err)
    {
      console.log(err);
      th.res.json({message : "Db Error",status : false});
      }
    else
    {
      th.res.json({message : "category added successfully",status : true,category : results});
    }
})

}
dataController.findcategory = function(req,res)
{
  var th = this;
  Category.find({},function(err,results){
    if (err)
      {
         console.log(err);
         th.res.json({message : "Db Error",status : false});
      }
      else{
        console.log(results);
        th.res.json({category : results,status : true});
      }
  })
}
dataController.deleteCategory = function(req,res)
{
  var th = this;
  var id = th.req.param('id');
  Category.remove({_id : id},function(err,results){
    if (err){
        console.log(err);
        th.res.json({message : "Db Error",status : false});
      }
      else{
        th.res.json({message : "Category successfully deleted",country : results,status : true});
      }
  })
}
dataController.editCategory = function(req,res)
{
  var th = this;
  var category = th.req.param('category');
  var id      = th.req.param('id');
  Category.update({_id : id},{category : category},function(err,results){
    if (err){
      console.log(err);
      th.res.json({message : "Db Error",status : false});
    }
    else{
      th.res.json({message : "Category Updated successfully",status : true,category : results});
    }
  })
}

dataController.socialid = function(){
  var th = this;
  var cityname =  th.req.param('cityname');
  var fullname =  th.req.param('fullname');
  var latitude =  th.req.param('lat');
  var lngititude = th.req.param('lng');
  var photourl =  th.req.param('photourl');
  var userid =  th.req.param('userid');
  User.findOne({userid : userid},function(err,results){
    if (err){
      th.res.json({success : false,message : "Db Error"});
    }
    else if(results)
    {
      th.res.json({success : true,user : results});
    }
    else{
          User.create({cityname : cityname,fullname :fullname,latitude : latitude,lngititude : lngititude,photourl : photourl,userid : userid},function(err,results){
            if (err){
               th.res.json({success : false,message : "Db Error"});
            }
            else{
              th.res.json({success : true,user : results});
            }
          })
    }
  })
}

dataController.getCountryCity = function(){
  var th = this;
  Country.find({} ,function(err, countries){
    if(err){
      th.res.json({success:false, message:"Error in processing"});
    } else {
      var list = new Array();
      var i = -1;
      function next(){
        i++;
        if(i<countries.length){
          var obj = {
            countryname:countries[i].country,
            id : countries[i]._id
          };
          City.find({countryid:countries[i]._id}, function(err, cities){
            if(err) next();
            else {
              obj.cities = cities;
              list.push(obj);
              next();
            }
          });
        } else {
          th.res.json({success:true, countries:list});
        }
      }
      next();
    }
  });
}
dataController.createEvent = function(req,res){
var th = this;
var data = th.req.body.event;
Event.create(data,function(err,results){
  if (err)
    {
      console.log(err);
      th.res.json({message : "Db Error",status : "false"});
      }
    else
    {
      th.res.json({message : "Event added successfully",status : "true",event : results});
    }
})

}
dataController.findEvent = function(req,res)
{
  var th = this;
  Event.find({},function(err,results){
    if (err)
      {
         console.log(err);
         th.res.json({message : "Db Error",status : false});
      }
      else{
        console.log(results);
        th.res.json({event : results,status : true});
      }
  })
}
module.exports = dataController;
