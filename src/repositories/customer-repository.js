'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

// Chamada usando sincronismo, executa e retorna dados esperando a execução completa da função antes de retorna.
exports.get = async() => {
    const res = await Customer.find({});
    return res;
};

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
};

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.getByEmail = async(email) => {
    const res = await Customer.findOne({
        email: email
    });
    return res;
};

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
};