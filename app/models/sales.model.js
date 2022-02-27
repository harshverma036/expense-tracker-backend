const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Customer"
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Products'
    },
    product_code: {
        type: String
    },
    qty: {
        type: Number
    },
    unitPrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    discount: {
        type: Number
    },
    discountAmount: {
        type: Number
    },
    category: {
        type: String
    }
}, {
    timestamps: true
})

const Sales = mongoose.model('Sales', salesSchema);

module.exports = {
    Sales
}