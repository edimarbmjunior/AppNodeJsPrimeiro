'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/product-controller');
var autorizacaoService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
router.post('/', autorizacaoService.isAdmin, controller.post);
router.put('/:id', autorizacaoService.isAdmin, controller.put);
router.delete('/', autorizacaoService.isAdmin, controller.delete);

module.exports = router;