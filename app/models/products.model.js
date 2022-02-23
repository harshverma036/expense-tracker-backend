const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    productType: {
        type: String
    },
    totalQty: {
        type: Number
    },
    price: {
        type: Number
    }
}, {
    timestamps: true
});

const Products = mongoose.model('Products', productSchema);

module.exports = {
    Products
}