const pool = require("../../config/database");
const getAll = (req, res) => {
  let id = req.params.id;
  try {
    pool.query(
      "SELECT khung_gio.thoi_gian, khung_gio.gio_bat_dau, khung_gio.gio_ket_thuc, khung_gio.ma_san FROM khung_gio WHERE khung_gio.ma_san=?",
      [id],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          return res.status(200).json(data);
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "error system" });
  }
};
module.exports = { getAll };
