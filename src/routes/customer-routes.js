'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/customer-controller');
var autorizacaoService = require('../services/auth-service');

router.get('/', autorizacaoService.authorize, controller.get);
router.post('/', controller.post);
router.post('/autenticar', controller.autenticar);
router.post('/atualizarToken', autorizacaoService.authorize, controller.atualizarToken);

//Não possui ainda
/* router.get('/', controller.get);
router.put('/:id', controller.put);
router.delete('/', controller.delete); */

module.exports = router;