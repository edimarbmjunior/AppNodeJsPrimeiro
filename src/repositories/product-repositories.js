'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product.find({
        active:true // ativa o filtro
    },'title price slug tag'); // campos que deverar retornar
};

exports.getBySlug = (slug) => {
    return Product.findOne({
        slug: slug,
        active:true // ativa o filtro
    },'title description price slug tag'); // campos que deverar retornar
};

exports.getById = (id) => {
    return Product.findById(
        id,
        'title description price slug tag' // campos que deverar retornar
    );
};

exports.getByTag = (tag) => {
    return Product.find({
        tag: tag,
        active:true // ativa o filtro
    },'title description price slug tag'); // campos que deverar retornar
};

exports.create = (data) => {
    var product = new Product(data);
    return product.save();
}

exports.update = (id, data) => {
    return Product
        .findByIdAndUpdate(id, {
            $set:{
                title:data.title,
                description:data.description,
                price:data.price,
                slug:data.slug
            }
    })
};

exports.delete = (id) => {
    return Product.findOneAndRemove(id);
};