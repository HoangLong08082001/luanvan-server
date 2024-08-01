const AdminRoutes = require("./API/Admin/AdminRoutes");
const ChiNhanhRoutes = require("./API/ChiNhanh/ChiNhanhRoutes");
const DoAnRoutes = require("./API/DoAn/DoAnRoutes");
const DungCuTheThaoRoutes = require("./API/DungCuTheThao/DungCuTheThaoRoutes");
const DungCuYTeRoutes = require("./API/DungCuYTe/DungCuYTeRoutes");
const NuocUongRoutes = require("./API/NuocUong/NuocUongRoutes");
const sanRoutes = require("./API/San/sanRoutes");
const NguoiDungRoutes = require("./API/NguoiDung/NguoiDungRoutes");

const TamTinhRoutes = require("./API/TamTinh/TamTinhRoutes");
const PaymentRoutes = require("./API/Payment/PaymentRoutes");
const LoaiSanRoutes = require("./API/LoaiSan/LoaiSanRoutes");
const KhungGioRoutes = require("./API/KhungGio/KhungGioRoutes");
const HoaDonRoutes = require("./API/HoaDon/HoaDonRoutes");
const DashboardRoutes = require("./API/Dashboard/DashboardRoutes");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
dotenv.config();
const app = express();
const server = http.createServer(app); // Tạo server trước khi tạo WebSocket server

const port = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
AdminRoutes(app);
ChiNhanhRoutes(app);
DoAnRoutes(app);
DungCuYTeRoutes(app);
NuocUongRoutes(app);
DungCuTheThaoRoutes(app);
NguoiDungRoutes(app);
sanRoutes(app);
TamTinhRoutes(app);
PaymentRoutes(app);
LoaiSanRoutes(app);
KhungGioRoutes(app);
HoaDonRoutes(app);
DashboardRoutes(app);
app.listen(4000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server is running on the port " + port);
  }
});
