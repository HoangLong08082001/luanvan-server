const {
  create,
  getAll,
  getById,
  confrimPayment,
  getByMaKhachHang,
  getByMaHoaDon,
} = require("./HoaDonController");

const express = require("express");
const router = express.Router();
export default function HoaDonRoutes(app) {
  router.post("/create", create);
  router.get("/get-all", getAll);
  router.get("/get-by-id/:id", getById);
  router.put("/confirm", confrimPayment);
  router.get("/get-hoa-don-by-ma-khach-hang/:id", getByMaKhachHang);
  router.get("/get-hoa-don-by-ma-hoa-don/:id", getByMaHoaDon);
  return app.use("/hoa-don", router);
}
