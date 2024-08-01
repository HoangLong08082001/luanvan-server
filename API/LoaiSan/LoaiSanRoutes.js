const {
  Block,
  Delete,
  createNew,
  getAll,
  getById,
  updateLoaiSan,
} = require ("./LoaiSanController");

const express = require("express");
const router = express.Router();
module.exports = function LoaiSanRoutes(app) {
  router.get("/get-all", getAll);
  router.post("/create", createNew);
  router.put("/block", Block);
  router.delete("/delete/:id", Delete);
  router.get("/get-by-id/:id", getById);
  router.put("/update", updateLoaiSan);
  return app.use("/loai-san", router);
}
