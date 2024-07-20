const pool = require("../../config/database");
const randomNumberCodeVerfify = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const getDungCuYTe = (req, res) => {
  try {
    pool.query("SELECT * FROM dung_cu_y_te", [], (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
const createNew = (req, res) => {
  let hinhanh = req.body.hinhanh;
  let soluong = req.body.soluong;
  let tendungcuyte = req.body.tendungcuyte;
  let gia = req.body.gia;
  try {
    pool.query(
      "SELECT * FROM dung_cu_y_te WHERE ten_dung_cu_y_te LIKE ?",
      [tendungcuyte],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          return res
            .status(400)
            .json({ message: "Đã tồn tại dụng cụ y tế này" });
        } else {
          pool.query(
            "INSERT INTO dung_cu_y_te ( hinh_anh, trang_thai, gia_dung_cu, so_luong, ten_dung_cu_y_te) VALUES (?,?,?,?,?)",
            [hinhanh, 0, gia, soluong, tendungcuyte],
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
const BlockDungCuYTe = (req, res) => {
  let id_dungcuyte = req.body.id_dung_cu_y_te;
  try {
    pool.query(
      "SELECT * FROM dung_cu_y_te WHERE ma_dung_cu_y_te=?",
      [id_dungcuyte],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          if (data[0].trang_thai === 0) {
            pool.query(
              "UPDATE dung_cu_y_te SET trang_thai = 1 WHERE ma_dung_cu_y_te=?",
              [id_dungcuyte],
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
              "UPDATE dung_cu_y_te SET trang_thai = 0 WHERE ma_dung_cu_y_te=?",
              [id_dungcuyte],
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
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
const Delete = (req, res) => {
  let ma_y_te = req.params.id;

  try {
    pool.query(
      "DELETE FROM dung_cu_y_te WHERE ma_dung_cu_y_te=?",
      [ma_y_te],
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
  pool.query(
    "SELECT * FROM dung_cu_y_te WHERE ma_dung_cu_y_te=?",
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
};
const updateDungCuYTe = (req, res) => {
  let iddungcu = req.body.id_dung_cu;
  let hinhanh = req.body.hinh_anh;
  let soluong = req.body.so_luong;
  let tendungcu = req.body.ten_dung_cu;
  let gia = req.body.gia_dung_cu;
  pool.query(
    "UPDATE dung_cu_y_te SET hinh_anh=?, so_luong=?, ten_dung_cu_y_te=?, gia_dung_cu=? WHERE ma_dung_cu_y_te=?",
    [hinhanh, soluong, tendungcu, gia, iddungcu],
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
module.exports = {
  updateDungCuYTe,
  getById,
  getDungCuYTe,
  createNew,
  BlockDungCuYTe,
  Delete,
};
