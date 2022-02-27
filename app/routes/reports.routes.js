const { Report } = require("../controller/reports.controller");
const Router = require("express").Router();

Router.get("/agePercent", Report.ageReport);
Router.get("/agePercent/all", Report.getAllAgesReport);
Router.get("/gender", Report.getAllGenderReport);

module.exports = Router;
