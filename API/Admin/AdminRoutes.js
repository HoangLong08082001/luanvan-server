const { create, getAll, login, getById, sendMail, reNewPass } = require ("./AdminController");

const express = require("express");
const router = express.Router();

module.exports = function AdminRoutes(app) {
  router.post("/create", create);
  router.post("/login", login);
  router.get("/get", getAll);
  router.get("/get-by-id/:id", getById);
  router.post('/send-mail',sendMail);
  router.put('/re-new', reNewPass);
  return app.use("/admin", router);
}
