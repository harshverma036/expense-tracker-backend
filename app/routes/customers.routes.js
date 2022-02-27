const { Customers } = require('../controller/customers.controller');

const Router = require('express').Router()

Router.get('/all', Customers.getAll);
Router.put('/update-mode', Customers.updateMode);
Router.get('/get-mode', Customers.getAllModeData);

module.exports = Router;