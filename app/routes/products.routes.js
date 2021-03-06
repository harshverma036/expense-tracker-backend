const { Product } = require('../controller/products.controller')

const Router = require('express').Router();

Router.put('/update-category', Product.updateProductCategory);
Router.get('/categories', Product.getAllProductCategory);
Router.get('/categories-wise', Product.getAllProductCountCategoryWise);
Router.put('/update-sales', Product.updatedata);

module.exports = Router;