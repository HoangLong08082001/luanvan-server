const express = require("express");
const {
  getTotal,
  getDoughnutChart,
  getBarChart,
} = require("./DashboardController");
const router = express.Router();

module.exports = function DashboardRoutes(app) {
  router.get("/get-total", getTotal);
  router.get("/get-doughnut-chart", getDoughnutChart);
  router.get("/get-bar-chart", getBarChart);
  app.use("/dashboard", router);
};
