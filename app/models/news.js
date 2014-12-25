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
    var newsSchema = new Schema ({
        newslink : {
            type : String,
            require :  true
        },
        newstypeid :{
            type : Schema.Types.ObjectId,
            ref  : 'newstypes'
        },
        createddate : {
            type : String,
            require : true
        },
        title :{
            type : String,
            require : true
        },
        status : {
            type : Boolean,
            default :  false,
        },
    });

    return mongoose.model('news', newsSchema);
}());