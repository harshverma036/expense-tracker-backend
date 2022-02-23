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
        enum: ['male', 'female']
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