'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

// Chamada usando sincronismo, executa e retorna dados esperando a execução completa da função antes de retorna.
exports.get = async() => {
    const res = await Customer.find({
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

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}
/*exports.create = async(data) => {
    var product = new Product(data);
    return product.save();
} */