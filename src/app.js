'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//body-parser converter a resposta (response) para JSON
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//conecta ao banco de dados
//mongoose.connection('mongodb://nodejsedimar:nodejsedimar@ds117739.mlab.com:17739/nodejsteste');
let uri = 'mongodb://nodejsedimar:nodejsedimar@ds117739.mlab.com:17739/nodejsteste';

var options = {
    "server" : {
      "socketOptions" : {
        "keepAlive" : 300000,
        "connectTimeoutMS" : 30000
      }
    },
    "replset" : {
      "socketOptions" : {
        "keepAlive" : 300000,
        "connectTimeoutMS" : 30000
      }
    }
  }

mongoose.connect(uri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// carrega os modelos
const Product = require('./models/product');

//Carrega as Rotas
const indexRoute = require('./routes/index');
const productRoute = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;