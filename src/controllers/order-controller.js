'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');
const autorService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};

exports.post = async(req, res, next) => {
    try {

        //Recupera Token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica o token
        const data = await autorService.decodeToken(token);

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items:  req.body.items
        });
        res.status(201).send({
            message: 'Ordem/Pedido cadastro com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};
