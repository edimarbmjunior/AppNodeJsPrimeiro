'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    // o "_id" é gerado automaticamente pelo o mongodb de forma a controlar
    customer:{// referencia a outro modelo
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        required:true,
        default: Date.now
    },
    status:{
        type:String,
        required:true,
        enum:['created', 'done'],
        default: 'created'
    },
    items:[{
        quantity:{
            type: Number,
            required:true,
            default: 1
        },
        Product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
});

module.exports = mongoose.model('Order', schema);