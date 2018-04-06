'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    // o "_id" é gerado automaticamente pelo o mongodb de forma a controlar
    name:{
        type:String,
        required:true
    },
    email:{//identificador do Cliente
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles: [{
        type:String,
        required:true,
        enum:['user', 'admin'],
        default: 'user'
    }]
});

module.exports = mongoose.model('Customer', schema);