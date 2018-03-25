'use strict';

const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

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
        await repository.create(req.body);
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
/* exports.post = (req, res, next) => {
    let contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'O description deve conter pelo menos 3 caracteres.');

    // Se os dados forem inválidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto', data: e
            });
        });

    /* // OU
    //var product = new Product(req.body); -> perigoso
    var product = new Product();
    product.title = req.body.title;
    product.slug = req.body.slug;
    product.description = req.body.description;
    product.price = req.body.price;
    product.active = req.body.active;
    product.tag = req.body.tag;

    product.save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto', data: e
            });
        }); //
}; */
