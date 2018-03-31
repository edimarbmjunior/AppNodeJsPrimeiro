'use strict';

const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');

const autorService = require('../services/auth-service');
const emailService = require('../services/email-service');

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
    let contract = new validationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'O e-mail é inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres.');

    // Se os dados forem inválidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {

        var email = await repository.getByEmail(req.body.email);
        if (email){
            return res.status(500).send({
                message: 'Email de cliente já existe!'
            });
        }

        //await repository.create(req.body);
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: "user"
        });

        emailService.send(req.body.email, 'Bem vindo novo usuário ao introdução nodeJS!', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message: 'Cliente cadastro com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};

exports.autenticar = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer){
            return res.status(404).send({
                message: 'Usuário ou senha inválidos!'
            });
        }

        const token = await autorService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            message: 'Cliente cadastro com sucesso!',
            token: token,
            data: {
                id: customer._id,
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            }
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};

exports.atualizarToken = async(req, res, next) => {
    try {
        //Recupera Token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica o token
        const data = await autorService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if(!customer){
            return res.status(401).send({
                message: 'Usuário não encontrado!'
            });
        }

        const tokenData = await autorService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            message: 'Cliente cadastro com sucesso!',
            token: tokenData,
            data: {
                id: customer._id,
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            }
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};