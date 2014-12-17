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
    var usersSchema = new Schema ({
        cityname : {
            type : String,
            require :  true
        },
         fullname : {
            type : String,
            require :  true
        }, 
         latitude : {
            type : String,
            require :  true
        }, 
         lngititude : {
            type : String,
            require :  true
        }, 
         photourl : {
            type : String,
            require :  true
        },
         userid : {
            type : String,
            require :  true
        },
        date : {
            type : String,
            default : new Date()
        },   
        status : {
            type : Boolean,
            default :  false,
        },
    });

    return mongoose.model('users', usersSchema);

}());