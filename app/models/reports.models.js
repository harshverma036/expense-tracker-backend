const mongoose = require('mongoose')

const reportsSchema = new mongoose.Schema({
    data: {
        type: Object
    },
    reportType: {
        type: String,
        enum: ['Sales', 'Gender', 'Age', 'CustomerTime', 'Products']
    }
}, {
    timestamps: true
});

const Reports = mongoose.model('reports', reportsSchema);

module.exports = {
    Reports
}