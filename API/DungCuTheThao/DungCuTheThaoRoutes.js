const {
  BlockDungCuTheThao,
  createNew,
  getById,
  getall,
  updateDungCuTheThao,
} =  require("./DungCuTheThaoController");

const express = require("express");
const router = express.Router();
module.exports= function DungCuTheThaoRoutes(app) {
  router.get("/get", getall);
  router.post("/create", createNew);
  router.put("/block", BlockDungCuTheThao);
  router.get("/get-by-id/:id", getById);
  router.put("/update", updateDungCuTheThao);
  return app.use("/dung-cu-the-thao", router);
}
