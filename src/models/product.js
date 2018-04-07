'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // o "_id" é gerado automaticamente pelo o mongodb de forma a controlar
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{//identificador do produto
        type:String,
        required:[true, 'O slug é obrigatório!'],
        trim:true,
        index:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        required:true,
        default:true
    },
    tag: [{
        type:String,
        required:true
    }],
    image:{
        type:String,
        required:true,
        trim:true
    }
});

module.exports = mongoose.model('Product', schema);