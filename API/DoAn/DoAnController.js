const pool = require("../../config/database");
const randomNumberCodeVerfify = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const getDoAn = (req, res) => {
  try {
    pool.query("SELECT * FROM do_an", [], (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
};
const createNew = (req, res) => {
  let hinhanh = req.body.hinhanh;
  let tendoan = req.body.tendoan;
  let gia = req.body.gia;
  try {
    pool.query(
      "SELECT * FROM do_an WHERE ten_do_an=?",
      [tendoan],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          return res.status(400).json({ message: "Đã tồn tại loại đồ ăn này" });
        } else {
          pool.query(
            "INSERT INTO do_an ( hinh_anh, gia_do_an, trang_thai, ten_do_an) VALUES(?,?,?,?)",
            [hinhanh, gia, 0, tendoan],
            (err, data) => {
              if (err) {
                throw err;
              }
              if (data) {
                return res.status(200).json({ message: "success" });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
const BlockDoAn = (req, res) => {
  let id_doan = req.body.id_do_an;
  pool.query("SELECT * FROM do_an WHERE ma_do_an=?", [id_doan], (err, data) => {
    if (err) {
      throw err;
    }
    if (data.length > 0) {
      if (data[0].trang_thai === 0) {
        pool.query(
          "UPDATE do_an SET trang_thai = 1 WHERE ma_do_an=?",
          [id_doan],
          (err, data) => {
            if (err) {
              throw err;
            }
            if (data) {
              return res.status(200).json({ message: "success" });
            }
          }
        );
      }
      if (data[0].trang_thai === 1) {
        pool.query(
          "UPDATE do_an SET trang_thai = 0 WHERE ma_do_an = ?",
          [id_doan],
          (err, data) => {
            if (err) {
              throw err;
            }
            if (data) {
              return res.status(200).json({ message: "success" });
            }
          }
        );
      }
    }
  });
};
const Delete = (req, res) => {
  let ma_do_an = req.params.id;

  try {
    pool.query(
      "DELETE FROM do_an WHERE ma_do_an=?",
      [ma_do_an],
      (err, data) => {
        if (err) {
          return res.status(400).json({ message: "Không thể xoá" });
        }
        if (data) {
          return res.status(200).json({ message: "success" });
        } else {
          return res.status(400).json({ message: "Không thể xoá" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};
const getById = (req, res) => {
  let id = req.params.id;
  pool.query("SELECT * FROM do_an WHERE ma_do_an=?", [id], (err, data) => {
    if (err) {
      throw err;
    }
    if (data.length > 0) {
      return res.status(200).json(data);
    }
  });
};
const updateDoAn = (req, res) => {
  let iddoan = req.body.id_do_an;
  let hinhanh = req.body.hinh_anh;
  let tendoan = req.body.ten_do_an;
  let gia = req.body.gia_do_an;
  pool.query(
    "UPDATE do_an SET hinh_anh=?, ten_do_an=?, gia_do_an=? WHERE ma_do_an=?",
    [hinhanh, tendoan, gia, iddoan],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        return res.status(200).json({ message: "success" });
      }
    }
  );
};
module.exports = { updateDoAn, getDoAn, createNew, BlockDoAn, Delete, getById };
