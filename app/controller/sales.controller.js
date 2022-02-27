const { Customer } = require('../models/customer.mode');
const { Products } = require('../models/products.model');
const { Sales } = require('../models/sales.model');
const momentRandom = require('moment-random');

class Sale {
    static async insert(req, res) {
        try {
            const productCategoies = [
                // 'Sauces & Oils',
                // 'Snacks',
                // 'Beverages',
                'Cosmetic',
                // 'Health Care',
                // 'Household Supplies',
                // 'Personal Care'
            ];
            const allCustomers = await Customer.find({});
            const allProducts = await Products.find({});
            for(let i = 0; i < 700; i++) {
                const customerInt = Math.floor(Math.random() * allCustomers.length);
                const productInt = Math.floor(Math.random() * allProducts.length);
                const qtyInt = Math.floor(Math.random() * 20) + 1;
                const categoryInt = Math.floor(Math.random() * productCategoies.length);
                const data = {
                    customerId: allCustomers[customerInt]._id,
                    productId: allProducts[productInt]._id,
                    qty: qtyInt,
                    unitPrice: allProducts[productInt].price,
                    totalPrice: allProducts[productInt].price * qtyInt,
                    product_code: allProducts[productInt].code,
                    category: productCategoies[categoryInt]
                }
                await Sales.create(data);
            }
            return res.json({
                status: 'success'
            })
        } catch (error) {
            return res.json({
                status: 'failed',
                msg: error.message
            })
        }
    }

    static async update(req, res) {
        try {
            const allSales = await Sales.find({}).count();
            for (let i = 0; i < allSales.length; i++) {
                const createdAtDate = momentRandom("2022-02-20", "2021-02-27");
                await Sales.updateOne({ _id: all })
            }
            return res.json({
                status: 'success',
                dates
            })
        } catch (error) {
            console.log(error)
            return res.json({
                staus: 'failed',
                msg: error.message
            })
        }
    }

    static async categoryWiseSale(req, res) {
        try {
            const productCategoies = [
                'Sauces & Oils',
                'Snacks',
                'Beverages',
                'Cosmetic',
                'Health Care',
                'Household Supplies',
                'Personal Care'
            ];
            const allsales = await Sales.find({});
            const data = [];
            for (let i = 0; i < productCategoies.length; i++) {
                const count = allsales.filter(x => x.category === productCategoies[i]).length;
                data.push({
                    category: productCategoies[i],
                    count
                })
            }
            return res.json({
                status: 'success',
                data
            })
        } catch (error) {
            console.log(error)
            return res.json({
                staus: 'failed',
                msg: error.message
            })
        }
    }
}

module.exports = {
    Sale
}