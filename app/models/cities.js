module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , _ = require('underscore')
        , findOrCreate = require('mongoose-findorcreate')
        , mongooseLong = require('mongoose-long')(mongoose)
        , SchemaTypes = mongoose.Schema.Types
        , autoIncrement = require('mongoose-auto-increment')
        ;
    var connection = mongoose.createConnection("mongodb://localhost/newducks");

    autoIncrement.initialize(connection);
    var citiesSchema = new Schema ({
        city : {
            type : String,
            require :  true
        },
        countryid :{
            type : Schema.Types.ObjectId,
            ref  : 'countries'
        }, 
        status : {
            type : Boolean,
            default :  false,
        },
    });

    return mongoose.model('cities', citiesSchema);
}());