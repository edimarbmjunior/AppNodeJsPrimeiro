'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// Chamada usando sincronismo, executa e retorna dados esperando a execução completa da função antes de retorna.
exports.get = async() => {
    const res = await Product.find({
        active:true // ativa o filtro
    },'title price slug tag'); // campos que deverar retornar
    return res;
};
// OU
// Chamada de promise desse jeito executa porém so retorna os dados em momento após, não definido
/* exports.get = () => {
    return Product.find({
        active:true // ativa o filtro
    },'title price slug tag'); // campos que deverar retornar
}; */

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
        slug: slug,
        active:true // ativa o filtro
    },'title description price slug tag'); // campos que deverar retornar
    return res;
};
/* exports.getBySlug = (slug) => {
    return Product.findOne({
        slug: slug,
        active:true // ativa o filtro
    },'title description price slug tag'); // campos que deverar retornar
}; */

exports.getById = async(id) => {
    const res = await Product.findById(id);
    return res;
};
/* exports.getById = (id) => {
    return Product.findById(
        id,
        'title description price slug tag' // campos que deverar retornar
    );
}; */

exports.getByTag = async(tag) => {
    const res = await Product.find({
        tag: tag,
        active:true // ativa o filtro
    },'title description price slug tag'); // campos que deverar retornar
    return res;
};
/* exports.getByTag = (tag) => {
    return Product.find({
        tag: tag,
        active:true // ativa o filtro
    },'title description price slug tag'); // campos que deverar retornar
}; */

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}
/*exports.create = async(data) => {
    var product = new Product(data);
    return product.save();
} */

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set:{
                title:data.title,
                description:data.description,
                price:data.price,
                slug:data.slug
            }
    })
};
/* exports.update = async(id, data) => {
    return Product
        .findByIdAndUpdate(id, {
            $set:{
                title:data.title,
                description:data.description,
                price:data.price,
                slug:data.slug
            }
    })
}; */

exports.delete = async(id) => {
    await Product.findByIdAndRemove(id);
};
/* exports.delete = async(id) => {
    return Product.findOneAndRemove(id);
}; */