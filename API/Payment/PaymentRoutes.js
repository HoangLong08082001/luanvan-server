const { MomoPayment, callBack } = require ("./PaymentController");

const express = require("express");
const router = express.Router();
module.exports = function PaymentRoutes(app) {
  router.post("/momo", MomoPayment);
  router.post("/callback", callBack);
  return app.use("/payment", router);
}
