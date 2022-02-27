const { Sale } = require('../controller/sales.controller')

const Router = require('express').Router();

Router.post('/insert', Sale.insert);
Router.get('/category-wise', Sale.categoryWiseSale);
Router.get('/mode-report', Sale.getModeReport);
Router.put('/update-date', Sale.update);
Router.get('/top-five-products', Sale.topProducts);

module.exports = Router;