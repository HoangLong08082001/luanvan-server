import { MomoPayment, callBack } from "./PaymentController";

const express = require("express");
const router = express.Router();
export default function PaymentRoutes(app) {
  router.post("/momo", MomoPayment);
  router.post("/callback", callBack);
  return app.use("/payment", router);
}
