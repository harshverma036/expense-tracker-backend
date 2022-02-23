const express = require("express");
const userRoutes = require("./app/routes/user.routes");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/expenseTracker")
  .then(() => console.log("db connection successfully.."))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(8084, () => console.log("server is running..."));
