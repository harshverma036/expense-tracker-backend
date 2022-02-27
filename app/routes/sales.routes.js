const { Sale } = require('../controller/sales.controller')

const Router = require('express').Router();

Router.post('/insert', Sale.insert);
Router.get('/category-wise', Sale.categoryWiseSale);
Router.put('/update-date', Sale.update);

module.exports = Router;