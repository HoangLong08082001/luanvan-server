const {
  Block,
  Delete,
  createNew,
  getAll,
  getById,
  getById2,
  search,
  updateSan,
} = require ("./sanController");

const express = require("express");
const router = express.Router();
module.exports = function sanRoutes(app) {
  router.post("/create", createNew);
  router.get("/get-all", getAll);
  router.put("/block", Block);
  router.delete("/delete/:id", Delete);
  router.get("/search/:search", search);
  router.get("/get-san/:id", getById);
  router.get("/get-by-id/:id", getById2);
  router.put("/update", updateSan);
  return app.use("/san", router);
}
