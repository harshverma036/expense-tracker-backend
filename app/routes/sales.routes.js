const { Sale } = require('../controller/sales.controller')

const Router = require('express').Router();

Router.post('/insert', Sale.insert);
Router.get('/category-wise', Sale.categoryWiseSale);
Router.get('/timely/:type', Sale.getTimeWiseReport);
Router.get('/mode-report', Sale.getModeReport);
Router.put('/update-date', Sale.update);
Router.get('/countall', Sale.countall);
Router.get('/top-five-products', Sale.topProducts);

module.exports = Router;