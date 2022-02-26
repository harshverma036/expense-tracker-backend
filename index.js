const express = require("express");
const userRoutes = require("./app/routes/user.routes");
const customersRoutes = require("./app/routes/customers.routes");
const reportRoutes = require("./app/routes/reports.routes");
const productRoutes = require("./app/routes/products.routes");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/expenseTracker")
  .then(() => console.log("db connection successfully.."))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/users", userRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/products", productRoutes);

app.listen(8084, () => console.log("server is running..."));
