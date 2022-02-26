const { Customer } = require("../models/customer.mode");
const { Reports } = require("../models/reports.models");

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
      const removeDuplicateAge = [...new Set(allAges)];
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
      const insertReport = await Reports.create({
        data: {
          ageData: {
            data: dataCount,
            ages: removeDuplicateAge,
          },
        },
        reportType: "Age",
      });
      console.log(insertReport);
      //   console.log(removeDuplicateAge)
      return res.json({
        status: "success",
        dataCount,
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
}

module.exports = {
  Report,
};
