const {
  Login,
  createNew,
  getAll,
  getAllById,
  getById,
  renew,
  sendMail,
} = require ("./NguoiDungController");

const express = require("express");
const router = express.Router();
module.exports = function NguoiDungRoutes(app) {
  router.get("/get-all", getAll);
  router.post("/login", Login);
  router.post("/register", createNew);
  router.get("/get-by-id/:id", getById);
  router.post("/send-mail", sendMail);
  router.put("/re-new", renew);
  router.get("/get-all-by-id/:id", getAllById);
  return app.use("/khach-hang", router);
}
