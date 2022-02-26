const { Customer } = require("../models/customer.mode");
const { Products } = require("../models/products.model");
const { Sales } = require("../models/sales.model");

class Insert {
  static async product(data) {
    try {
      const allproducts = await Products.insertMany(data);
      return allproducts;
    } catch (error) {
      console.log(error);
    }
  }

  static async customers(data) {
    try {
      const allcustomers = await Customer.insertMany(data);
      return allcustomers;
    } catch (error) {
      console.log(error);
    }
  }

  static async data(req, res) {
    try {
      const { type, data } = req.body;
      switch (type) {
        case "products":
          await this.product(data);
          break;
        case "customer":
          await this.customers(data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}

module.exports = {
  Insert,
};
