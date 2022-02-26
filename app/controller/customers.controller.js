const { Customer } = require("../models/customer.mode");

class Customers {
  static async getAll(req, res) {
    try {
      const allcustomers = await Customer.find({});
      return res.json({
        status: "success",
        data: allcustomers,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }
}

module.exports = {
    Customers
}