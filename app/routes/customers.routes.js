const { Customers } = require('../controller/customers.controller');

const Router = require('express').Router()

Router.get('/all', Customers.getAll);

module.exports = Router;