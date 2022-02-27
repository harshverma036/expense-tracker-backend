const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: String
    },
    gender: {
        type: String,
    },
    age: {
        type: Number
    }
}, {
    timestamps: true
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
    Customer
}