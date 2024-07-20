const pool = require("../../config/database");

const getAll = (req, res) => {
  try {
    pool.query("SELECT * FROM loai_san", [], (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};
const createNew = (req, res) => {
  let loai = req.body.loai_san;
  try {
    pool.query(
      "SELECT * FROM loai_san WHERE ten_loai_san=?",
      [loai],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          return res.status(400).json({ message: "Loại sân này đã tồn tại" });
        } else {
          pool.query(
            "INSERT INTO loai_san(trang_thai, ten_loai_san) VALUES(?,?)",
            [0, loai],
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
    return res.status(500).json({ message: "Error" });
  }
};
const Block = (req, res) => {
  let ma_loai = req.body.ma_loai_san;
  try {
    pool.query(
      "SELECT * FROM loai_san WHERE ma_loai_san = ?",
      [ma_loai],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          if (data[0].trang_thai === 1) {
            pool.query(
              "UPDATE loai_san SET trang_thai=0 WHERE ma_loai_san=?",
              [ma_loai],
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
          if (data[0].trang_thai === 0) {
            pool.query(
              "UPDATE loai_san SET trang_thai=1 WHERE ma_loai_san=?",
              [ma_loai],
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
    return res.status(500).json({ message: "Error" });
  }
};
const Delete = (req, res) => {
  let ma_loai = req.params.id;

  try {
    pool.query(
      "DELETE FROM loai_san WHERE ma_loai_san=?",
      [ma_loai],
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
  pool.query("SELECT * FROM loai_san WHERE ma_loai_san=?", [id], (err, data) => {
    if (err) {
      throw err;
    }
    if (data.length>0) {
      return res.status(200).json(data);
    }
  });
};
const updateLoaiSan = (req, res) => {
  let idloaisan = req.body.id_loai_san;
  let loaisan = req.body.ten_loai_san;
  try {
    pool.query(
      "UPDATE loai_san SET ten_loai_san = ? WHERE ma_loai_san=?",
      [loaisan, idloaisan],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data) {
          return res.status({ message: "success" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "error system" });
  }
};
module.exports = { updateLoaiSan, getById, getAll, createNew, Block, Delete };
