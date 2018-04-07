'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//body-parser converter a resposta (response) para JSON
const mongoose = require('mongoose');
const uri = require('./mongoose-dados-uri/uri');
const config = require('./config');

const app = express();
const router = express.Router();

let URI = uri.recuperaUri();

const options = {
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

//mongoose.connect(URI, options);
//mongoose.connect(URI);
mongoose.connect(config.connectionString);
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
const orderRoute = require('./routes/order-routes');

//app.use(bodyParser.json());// Usar dessa forma existe um limite já pré-estabelecido
app.use(bodyParser.json({
  limit: '5mb' // Limite do corpo de comunicação do corpo do JSON
}));
app.use(bodyParser.urlencoded({
    extended: false
  })
);

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/order', orderRoute);

module.exports = app;