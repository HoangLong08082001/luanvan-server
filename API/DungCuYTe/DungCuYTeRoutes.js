const {
  BlockDungCuYTe,
  Delete,
  createNew,
  getById,
  getDungCuYTe,
  updateDungCuYTe,
} = require ("./DungCuYTeController");

const express = require("express");
const router = express.Router();
module.exports = function DungCuYTeRoutes(app) {
  router.get("/get-all", getDungCuYTe);
  router.post("/create", createNew);
  router.put("/block", BlockDungCuYTe);
  router.delete("/delete/:id", Delete);
  router.get("/get-by-id/:id", getById);
  router.put('/update', updateDungCuYTe);
  return app.use("/dung-cu-y-te", router);
}
