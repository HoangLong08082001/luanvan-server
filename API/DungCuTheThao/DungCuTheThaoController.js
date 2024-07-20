const pool = require("../../config/database");
const randomNumberCodeVerfify = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const getall = (req, res) => {
  pool.query("SELECT * FROM dung_cu_the_thao", [], (err, data) => {
    if (err) {
      throw err;
    }
    if (data) {
      return res.status(200).json(data);
    }
  });
};

const createNew = (req, res) => {
  let hinhanh = req.body.hinhanh;
  let soluong = req.body.soluong;
  let tendungcuthetheo = req.body.tendungcuthethao;
  let gia = req.body.gia;
  pool.query(
    "SELECT * FROM dung_cu_the_thao WHERE ten_dung_cu_the_thao LIKE ?",
    [tendungcuthetheo],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        return res
          .status(400)
          .json({ message: "Đã tồn tại dụng cụ thể thao này" });
      } else {
        pool.query(
          "INSERT INTO dung_cu_the_thao (hinh_anh, trang_thai, gia_dung_cu, so_luong, ten_dung_cu_the_thao) VALUES(?,?,?,?,?)",
          [hinhanh, 0, gia, soluong, tendungcuthetheo],
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
};

const BlockDungCuTheThao = (req, res) => {
  let id_dungcuthethao = req.body.id_dung_cu_the_thao;
  try {
    pool.query(
      "SELECT * FROM dung_cu_the_thao WHERE ma_dung_cu_the_thao = ?",
      [id_dungcuthethao],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          if (data[0].trang_thai === 0) {
            pool.query(
              "UPDATE dung_cu_the_thao SET trang_thai = 1 WHERE ma_dung_cu_the_thao=?",
              [id_dungcuthethao],
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
              "UPDATE dung_cu_the_thao SET trang_thai = 0 WHERE ma_dung_cu_the_thao=?",
              [id_dungcuthethao],
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
  let ma_the_thao = req.params.id;

  try {
    pool.query(
      "DELETE FROM dung_cu_the_thao WHERE ma_dung_cu_the_thao=?",
      [ma_the_thao],
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
    "SELECT * FROM dung_cu_the_thao WHERE ma_dung_cu_the_thao=?",
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
const updateDungCuTheThao = (req, res) => {
  let iddungcu = req.body.id_dung_cu;
  let hinhanh = req.body.hinh_anh;
  let tendungcu = req.body.ten_dung_cu;
  let soluong = req.body.so_luong;
  let gia = req.body.gia;
  pool.query(
    "UPDATE dung_cu_the_thao SET hinh_anh=?, ten_dung_cu_the_thao=?, so_luong=?, gia_dung_cu=? WHERE ma_dung_cu_the_thao=?",
    [hinhanh, tendungcu, soluong, gia, iddungcu],
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
module.exports = {updateDungCuTheThao, getById, getall, createNew, BlockDungCuTheThao, Delete };
