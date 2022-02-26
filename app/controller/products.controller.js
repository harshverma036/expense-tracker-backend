const { Products } = require('../models/products.model');

class Product {
    static async updateProductCategory(req, res) {
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
            const getallproducts = await Products.find({});
            for (let i = 0; i < getallproducts.length; i++) {
                const rndInt = Math.floor(Math.random() * productCategoies.length);
                await Products.updateOne({ code: getallproducts[i].code }, {
                    $set: {
                        category: productCategoies[rndInt]
                    }
                });
            }
            return res.json({
                status: 'success'
            })
        } catch (error) {
            console.log(error)

            return res.json({
                status: 'failed',
                msg: error.message
            })
        }
    } 

    static async getAllProductCategory(req, res) {
        try {
            const categories = await Products.find({}).distinct('category');
            return res.json({
                status: 'success',
                data: categories
            })
        } catch (error) {
            console.log(error)

            return res.json({
                status: 'failed',
                msg: error.message
            })
        }
    }

    static async getAllProductCountCategoryWise(req, res) {
        try {
            const categories = await Products.find({}).distinct('category');
            const data = [];
            for (let i = 0; i < categories.length; i++) {
                const datacount = await Products.find({ category: categories[i] }).count();
                data.push({
                    category: categories[i],
                    count: datacount
                })
            }
            return res.json({
                status: 'success',
                data
            })
        } catch (error) {
            console.log(error);
            return res.json({
                status: 'failed',
                msg: error.message
            })
        }
    }
}

module.exports = {
    Product
}