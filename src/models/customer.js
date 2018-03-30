'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
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
    }
});

module.exports = mongoose.model('Customer', schema);