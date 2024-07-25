const mysql = require("mysql");

// const pool = mysql.createConnection({
//   port: 3306,
//   host: "bdkrv4uf7kpaniqwj931-mysql.services.clever-cloud.com",
//   user: "ukkswwf1deccs8x8",
//   password: "nOIm9aunrqj9MavlqrQz",
//   database: "bdkrv4uf7kpaniqwj931",
//   connectionLimit: 10,
// });
const pool = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "sportretal",
  connectionLimit: 10,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});
module.exports = pool;
