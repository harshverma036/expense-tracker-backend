const { Customer } = require("../models/customer.mode");
const { Products } = require("../models/products.model");
const { Sales } = require("../models/sales.model");
const momentRandom = require("moment-random");
const m = require("moment");

class Sale {
  static async insert(req, res) {
    try {
      const productCategoies = [
        // 'Sauces & Oils',
        // 'Snacks',
        // 'Beverages',
        "Cosmetic",
        // 'Health Care',
        // 'Household Supplies',
        // 'Personal Care'
      ];
      const allCustomers = await Customer.find({});
      const allProducts = await Products.find({});
      for (let i = 0; i < 700; i++) {
        const customerInt = Math.floor(Math.random() * allCustomers.length);
        const productInt = Math.floor(Math.random() * allProducts.length);
        const qtyInt = Math.floor(Math.random() * 20) + 1;
        const categoryInt = Math.floor(Math.random() * productCategoies.length);
        const data = {
          customerId: allCustomers[customerInt]._id,
          productId: allProducts[productInt]._id,
          qty: qtyInt,
          unitPrice: allProducts[productInt].price,
          totalPrice: allProducts[productInt].price * qtyInt,
          product_code: allProducts[productInt].code,
          category: productCategoies[categoryInt],
        };
        await Sales.create(data);
      }
      return res.json({
        status: "success",
      });
    } catch (error) {
      return res.json({
        status: "failed",
        msg: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const allSales = await Sales.find({});
      for (let i = 0; i < allSales.length; i++) {
        const createdAtDate = momentRandom("2022-02-20", "2021-02-27");
        await Sales.updateOne(
          { _id: allSales[i]._id },
          {
            $set: {
              createdAt: new Date(createdAtDate),
            },
          }
        );
      }
      return res.json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        staus: "failed",
        msg: error.message,
      });
    }
  }

  static async categoryWiseSale(req, res) {
    try {
      const productCategoies = [
        "Sauces & Oils",
        "Snacks",
        "Beverages",
        "Cosmetic",
        "Health Care",
        "Household Supplies",
        "Personal Care",
      ];
      const allsales = await Sales.find({});
      const data = [];
      for (let i = 0; i < productCategoies.length; i++) {
        const count = allsales.filter(
          (x) => x.category === productCategoies[i]
        ).length;
        data.push({
          category: productCategoies[i],
          count,
        });
      }
      return res.json({
        status: "success",
        data,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        staus: "failed",
        msg: error.message,
      });
    }
  }

  static async topProducts(req, res) {
    try {
      const products = await Products.find({});
      const productIds = products.map((x) => x.code);
      const tempData = [];
      for (let i = 0; i < products.length; i++) {
        const count = await Sales.find({
          product_code: products[i].code,
        }).count();
        tempData.push({
          productName: products[i].name,
          category: products[i].category,
          count,
        });
      }
      const data = [];
      const sortcount = tempData.map((x) => x.count);
      sortcount.sort(function (a, b) {
        return b - a;
      });
      console.log(sortcount.slice(0, 5));
      for (let i = 0; i < sortcount.length; i++) {
        const findcount = tempData.find((x) => x.count === sortcount[i]);
        data.push(findcount);
      }
      return res.json({
        status: "success",
        data,
        labels: sortcount.slice(0, 5),
        name: data.slice(0, 5).map((x) => x.productName),
        category: data.slice(0, 5).map((x) => x.category),
      });
    } catch (error) {
      console.log(error);
      return res.json({
        staus: "failed",
        msg: error.message,
      });
    }
  }

  static async getModeReport(req, res) {
    try {
      const online = await Customer.find({ mode: "Online" });
      const offline = await Customer.find({ mode: "Offline" });
      const onlineIds = online.map((x) => x._id);
      const offlineIds = offline.map((x) => x._id);

      const onlineReport = await Sales.find({
        customerId: {
          $in: onlineIds,
        },
      }).count();

      const offlineReport = await Sales.find({
        customerId: {
          $in: offlineIds,
        },
      }).count();
      return res.json({
        status: "success",
        data: {
          onlineReport,
          offlineReport,
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({
        staus: "failed",
        msg: error.message,
      });
    }
  }

  static async getTimeWiseReport(req, res) {
    try {
      const { type } = req.params;
      let data = [];
      if (type === "all") {
        const distinctdata = await Sales.find({}).distinct("createdAt");
        const duplicateformatdate = distinctdata.map((x) =>
          m(x).format("YYYY-MM-DD")
        );
        const removeDuplicates = [...new Set(duplicateformatdate)];
        data.push(duplicateformatdate);
      }
      return res.json({
        status: "success",
        data,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        staus: "failed",
        msg: error.message,
      });
    }
  }

  static async countall(req, res) {
    try {
      const allSales = await Sales.find({}).count();
      const allCusomers = await Customer.find({}).count();
      const products = await Products.find({}).count();
      const category = 7;
      return res.json({
        status: "success",
        data: {
          allSales,
          allCusomers,
          products,
          category,
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({
        staus: "failed",
        msg: error.message,
      });
    }
  }
}

module.exports = {
  Sale,
};
