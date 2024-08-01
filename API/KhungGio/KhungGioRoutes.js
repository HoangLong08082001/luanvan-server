const { getAll } = require ("./KhungGioController");

const express = require("express");
const router = express.Router();
module.exports = function KhungGioRoutes(app) {
  router.get("/get-all/:id", getAll);
  return app.use("/khung-gio", router);
}
