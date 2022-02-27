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

  static async getAllModeData(req, res) {
    try {
      const online = await Customer.find({
        mode: 'Online'
      }).count()
      const offline = await Customer.find({
        mode: 'Offline'
      }).count()
      return res.json({
        status: "success",
        data: {
          online,
          offline
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async updateMode(req, res) {
    try {
      const onlineoroffline = [
        'Online',
        'Offline'
      ];
      const allcustomers = await Customer.find({});
      for (let i = 0; i < allcustomers.length; i++) {
        const rndInt = Math.floor(Math.random() * 2);
        await Customer.updateOne({ _id: allcustomers[i]._id }, {
          $set: {
            mode: onlineoroffline[rndInt]
          }
        })
      }
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