import { getAll } from "./KhungGioController";

const express = require("express");
const router = express.Router();
export default function KhungGioRoutes(app) {
  router.get("/get-all/:id", getAll);
  return app.use("/khung-gio", router);
}
