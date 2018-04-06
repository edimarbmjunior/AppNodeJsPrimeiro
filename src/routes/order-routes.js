'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/order-controller');

router.get('/', controller.get);
router.post('/', controller.post);

//Não possui ainda
/* router.get('/', controller.get);
router.put('/:id', controller.put);
router.delete('/', controller.delete); */

module.exports = router;