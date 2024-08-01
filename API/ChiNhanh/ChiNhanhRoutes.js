const {
  BlockChiNhanh,
  Delete,
  createChiNhanh,
  getAllChiNhanh,
  getById,
  getChiNhanh,
  getQuanPhuong,
  updateChiNhanh,
} = require ("./ChiNhanhController");

const express = require("express");
const router = express.Router();
module.exports = function ChiNhanhRoutes(app) {
  router.get("/get-all", getChiNhanh);
  router.post("/create", createChiNhanh);
  router.get("/get-phuong-quan", getQuanPhuong);
  router.put("/block", BlockChiNhanh);
  router.get("/get-chi-nhanh", getAllChiNhanh);
  router.delete("/delete/:id", Delete);
  router.get("/get-by-id/:id", getById);
  router.put("/update", updateChiNhanh);
  return app.use("/chi-nhanh", router);
}
