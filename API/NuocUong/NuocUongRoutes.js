const {
  BlockNuocUong,
  Delete,
  createNew,
  getById,
  getLoaiNuoc,
  getNuocUong,
} = require ("./NuocUongController");

const express = require("express");
const router = express.Router();
module.exports =  function NuocUongRoutes(app) {
  router.get("/get-all", getNuocUong);
  router.get("/get-loai-nuoc", getLoaiNuoc);
  router.post("/create", createNew);
  router.put("/block", BlockNuocUong);
  router.delete("/delete/:id", Delete);
  router.get("/get-by-id/:id", getById);
  return app.use("/nuoc-uong", router);
}
