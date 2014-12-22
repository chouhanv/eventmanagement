module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , _ = require('underscore')
        , findOrCreate = require('mongoose-findorcreate')
        , mongooseLong = require('mongoose-long')(mongoose)
        , SchemaTypes = mongoose.Schema.Types
        , autoIncrement = require('mongoose-auto-increment');
    var connection = mongoose.createConnection("mongodb://localhost/newducks");

    autoIncrement.initialize(connection);
    var eventsSchema = new Schema ({
        eventname : {
            type : String,
            require :  true
        },
        eventlocation : {
            type : String,
            require :  true
        }, 
        countryid :{
            type : Schema.Types.ObjectId,
            ref  : 'countries'
        }, 
        cityid : {
            type : Schema.Types.ObjectId,
            ref  : 'cities'
        }, 
        categoryid : {
            type : Schema.Types.ObjectId,
            ref  : 'categories'
        }, 
        description : {
            type : String,
            require :  true
        }, 
        photosurl : {
            type : String,
            require :  true
        }, 
        dtstart : {
            type : String,
            require :  true
        },
         dtend : {
            type : String,
            require :  true
        }, 
        latitude : {
            type : String,
            require :  true
        }, 
        longitude : {
            type : String,
            require :  true
        }, 
        istopevent :
        {
             type : Boolean,
              require :  true
        }, 
        status : {
            type : Boolean,
            default :  false,
        },
    });

    return mongoose.model('events', eventsSchema);

}());