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
        events : {},
        newses : [],
        phoneNumbers : [],
        twittertags : [],
        website     : [],
         date : {
            type : String,
            default : new Date()
        }, 
        status : {
            type : Boolean,
            default :  false
        },
    });

    return mongoose.model('events', eventsSchema);

}());