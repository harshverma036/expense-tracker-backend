const { Customer } = require("../models/customer.mode");
const { Reports } = require("../models/reports.models");
const { Sales } = require("../models/sales.model");

class Report {
  calculateAgePercent(data) {
    try {
      const allAges = data.map((x) => x.age);
      const removeDuplicateAge = new Set([...allAges]);
      console.log(removeDuplicateAge);
    } catch (error) {
      console.log(error);
    }
  }

  static async ageReport(req, res) {
    try {
      const allData = await Customer.find({});
      const allAges = allData.map((x) => x.age);
      const removeDuplicateAge = [...new Set(allAges)].sort();
      const dataCount = [];
      console.log(removeDuplicateAge, removeDuplicateAge.length);
      for (let i = 0; i < removeDuplicateAge.length; i++) {
        console.log(String(removeDuplicateAge[i]));
        const d = await Customer.find({ age: removeDuplicateAge[i] }).count();
        dataCount.push({
          age: removeDuplicateAge[i],
          count: d,
        });
      }
      const dataRanges = removeDuplicateAge.length;
      const ranges = [];
      for(let i = 0; i < removeDuplicateAge.length; i++) {
        const r1 = removeDuplicateAge[i];
        // for (let j = i + 4; j < removeDuplicateAge.length; j++) {
          const r2 = removeDuplicateAge[i + 5];
          ranges.push(`${r1}-${r2}`)
        // } 
      }
      console.log(dataRanges, 'RANGE')
      const insertReport = await Reports.create({
        data: {
          ageData: {
            data: dataCount,
            ages: removeDuplicateAge,
          },
        },
        reportType: "Age",
      });
      // console.log(insertReport);
      //   console.log(removeDuplicateAge)
      return res.json({
        status: "success",
        dataCount,
        ranges
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async getAllAgesReport(req, res) {
    try {
      const allAgeReport = await Reports.find({
        reportType: "Age",
      });
      return res.json({
        status: "success",
        data: allAgeReport,
      });
    } catch (error) {
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async getAllGenderReport(req, res) {
    try {
      const male = await Customer.find({
        gender: 'Male'
      }).count();
      const female = await Customer.find({
        gender: 'Female'
      }).count();
      const others = await Customer.find({
        gender: {
          $nin: ['Male', 'Female']
        }
      }).count();
      return res.json({
        status: 'success',
        data: {
          male,
          female,
          others
        }
      })
    } catch (error) {
      console.log(error)
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async getAllCount(req, res) {
    try {
      const totalCustomers = await Customer.find({}).count();
      const totalSales = await Sales.find({}).count();
    } catch (error) {
      console.log(error)
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  } 
}

module.exports = {
  Report,
};
