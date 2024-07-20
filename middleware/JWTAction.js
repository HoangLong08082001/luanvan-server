const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const createJwtWebsite = (payload) => {
  let token = null;
  try {
    token = jwt.sign(payload, "cang-dat-stu-2024", {
      expiresIn: 60,
    });
  } catch (error) {
    throw error;
  }
  return token;
};

module.exports = { createJwtWebsite };
