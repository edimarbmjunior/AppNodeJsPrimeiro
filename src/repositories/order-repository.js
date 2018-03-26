'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

// Chamada usando sincronismo, executa e retorna dados esperando a execução completa da função antes de retorna.
exports.get = async() => {
    const res = await Order
        .find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.Product', 'title');
    return res;
};

exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}
