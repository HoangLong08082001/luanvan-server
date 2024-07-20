import {
  BlockNuocUong,
  Delete,
  createNew,
  getById,
  getLoaiNuoc,
  getNuocUong,
} from "./NuocUongController";

const express = require("express");
const router = express.Router();
export default function NuocUongRoutes(app) {
  router.get("/get-all", getNuocUong);
  router.get("/get-loai-nuoc", getLoaiNuoc);
  router.post("/create", createNew);
  router.put("/block", BlockNuocUong);
  router.delete("/delete/:id", Delete);
  router.get("/get-by-id/:id", getById);
  return app.use("/nuoc-uong", router);
}
