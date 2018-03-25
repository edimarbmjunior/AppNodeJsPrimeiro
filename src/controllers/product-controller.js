'use strict';

const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repositories');

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
//OU
// Utilizado quando utilizado somente promise
/* exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
    // ou

    /* Product.find({
        active:true // ativa o filtro
    },'title price slug') // campos que deverar retornar
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        }); //
}; */

exports.getBySlug = async(req, res, next) => {

    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};
/* exports.getBySlug = (req, res, next) => {

    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });

    // OU

    /* Product.findOne({
        slug: req.params.slug,
        active:true // ativa o filtro
    },'title description price slug tag') // campos que deverar retornar
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        }); //
}; */

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};
/* exports.getById = (req, res, next) => {

    repository
        .getById(req.params.id)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
    
    //OU
    /* Product.findById(
            req.params.id,
            'title description price slug tag' // campos que deverar retornar
        )
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        }); //
}; */

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};
/* exports.getByTag = (req, res, next) => {
    
    repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
    
    //OU
    /* Product.find({
        tag:req.params.tag,
        active:true
    }, 'title description price slug tag' // campos que deverar retornar
        )
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        }); //
}; */

exports.post = async(req, res, next) => {
    let contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'O description deve conter pelo menos 3 caracteres.');

    // Se os dados forem inválidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Produto cadastro com sucesso!'
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

exports.put = async(req, res, next) => {
    
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto alterado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};
/* exports.put = (req, res, next) => {
    
    repository
        .update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            })
        }).catch(e => {
            res.status(400).send({
                message:'Falha ao atualizar o produto',
                data: e
            })
        });

    // OU
    /*
    Product.findByIdAndUpdate(req.params.id, {
        $set:{
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            slug:req.body.slug
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        })
    }).catch(e => {
        res.status(400).send({
            message:'Falha ao atualizar o produto',
            data: e
        })
    }); /
}; */

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
};
/* exports.delete = (req, res, next) => {
    
    repository
        .delete(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            })
        }).catch(e => {
            res.status(400).send({
                message:'Falha ao remover o produto',
                data: e
            })
        });

    // OU
    /* Product.findOneAndRemove(req.body.id)
    .then(x => {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        })
    }).catch(e => {
        res.status(400).send({
            message:'Falha ao remover o produto',
            data: e
        })
    }); /
}; */