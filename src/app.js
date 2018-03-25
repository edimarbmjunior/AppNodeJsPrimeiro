'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//body-parser converter a resposta (response) para JSON
const mongoose = require('mongoose');
const uri = require('./mongoose-dados-uri/uri');

const app = express();
const router = express.Router();

let URI = uri.recuperaUri();

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

mongoose.connect(URI, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// carrega os modelos
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega as Rotas
const indexRoute = require('./routes/index');
const productRoute = require('./routes/product');
const customerRoute = require('./routes/customer-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  })
);

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);

module.exports = app;