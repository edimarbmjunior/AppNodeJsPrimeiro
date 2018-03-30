'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.get('/', controller.get);
router.get('/autenticar', controller.autenticar);
router.post('/', controller.post);
router.post('/autenticar', controller.autenticar);

//Não possui ainda
/* router.get('/', controller.get);
router.put('/:id', controller.put);
router.delete('/', controller.delete); */

module.exports = router;