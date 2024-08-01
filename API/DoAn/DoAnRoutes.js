const {
  BlockDoAn,
  Delete,
  createNew,
  getById,
  getDoAn,
  updateDoAn,
} = require ("./DoAnController");

const express = require("express");
const router = express.Router();
module.exports = function DoAnRoutes(app) {
  router.get("/get-all", getDoAn);
  router.post("/create", createNew);
  router.put("/block", BlockDoAn);
  router.delete("/delete/:id", Delete);
  router.get("/get-by-id/:id", getById);
  router.put("/update", updateDoAn);
  return app.use("/do-an", router);
}
