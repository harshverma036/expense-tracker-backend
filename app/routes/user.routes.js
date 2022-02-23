const Router = require('express').Router()
const { Users } = require('../controller/user.controller')

Router.post('/register', Users.register);
Router.post('/login', Users.login);

module.exports = Router;