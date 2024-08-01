const pool = require("../../config/database");
const createNew = (req, res) => {
  //ten_san	description	hinh_anh	trang_thai	ma_chi_nhanh
  let ten = req.body.ten;
  let hinhanh = req.body.hinhanh;
  let mota = req.body.mota;
  let machinhanh = req.body.machinhanh;
  let loaisan = req.body.loaisan;
  let giatien = req.body.giatien;
  try {
    pool.query("SELECT * FROM san WHERE ten_san LIKE ?", [ten], (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        return res.status(400).json({ message: "Sân này đã tồn tại" });
      } else {
        pool.query(
          "INSERT INTO san(ten_san, ma_loai_san, description, hinh_anh, gia_san, trang_thai, ma_chi_nhanh) VALUES (?,?,?,?,?,?,?)",
          [ten, loaisan, mota, hinhanh, giatien, 0, machinhanh],
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
    });
  } catch (error) {
    return res.status(500).json({ message: "error system" });
  }
};
const Block = (req, res) => {
  let masan = req.body.ma_san;
  pool.query("SELECT * FROM san WHERE ma_san=?", [masan], (err, data) => {
    if (err) {
      throw err;
    }
    if (data.length > 0) {
      if (data[0].trang_thai === 0) {
        pool.query(
          "UPDATE san SET trang_thai = 1 WHERE ma_san=?",
          [masan],
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
          "UPDATE san SET trang_thai = 0 WHERE ma_san=?",
          [masan],
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
const getAll = (req, res) => {
  try {
    pool.query(
      "SELECT * FROM san join chi_nhanh on san.ma_chi_nhanh=chi_nhanh.ma_chi_nhanh join quan_huyen on chi_nhanh.ma_quan_huyen=quan_huyen.ma_quan_huyen join loai_san on san.ma_loai_san=loai_san.ma_loai_san",
      [],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data) {
          return res.status(200).json(data);
        }
      }
    );
  } catch (error) {}
};
const Delete = (req, res) => {
  let ma_san = req.params.id;

  try {
    pool.query("DELETE FROM san WHERE ma_san=?", [ma_san], (err, data) => {
      if (err) {
        return res.status(400).json({ message: "Không thể xoá" });
      }
      if (data) {
        return res.status(200).json({ message: "success" });
      } else {
        return res.status(400).json({ message: "Không thể xoá" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};
const search = (req, res) => {
  let search = req.params.search;
  try {
    pool.query(
      "SELECT * FROM san join chi_nhanh on san.ma_chi_nhanh=chi_nhanh.ma_chi_nhanh join quan_huyen on chi_nhanh.ma_quan_huyen=quan_huyen.ma_quan_huyen join loai_san on san.ma_loai_san=loai_san.ma_loai_san WHERE quan_huyen.ten_quan = ? OR loai_san.ten_loai_san LIKE ? OR san.ten_san LIKE ?",
      [search, search, search],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          return res.status(200).json(data);
        } else if (data.length <= 0) {
          return res.status(400).json({ message: "Không tìm thấy" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const getById = (req, res) => {
  let id = req.params.id;
  try {
    pool.query(
      "SELECT * FROM san join chi_nhanh on san.ma_chi_nhanh=chi_nhanh.ma_chi_nhanh join quan_huyen on chi_nhanh.ma_quan_huyen=quan_huyen.ma_quan_huyen join loai_san on san.ma_loai_san=loai_san.ma_loai_san WHERE loai_san.ma_loai_san=?",
      [id],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          return res.status(200).json({ name: data[0].ten_loai_san, data });
        } else {
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};
const getById2 = (req, res) => {
  let id = req.params.id;
  pool.query(
    "SELECT * FROM san join chi_nhanh on san.ma_chi_nhanh=chi_nhanh.ma_chi_nhanh join quan_huyen on chi_nhanh.ma_quan_huyen=quan_huyen.ma_quan_huyen join loai_san on san.ma_loai_san=loai_san.ma_loai_san WHERE ma_san=?",
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
const updateSan = (req, res) => {
  let idsan = req.body.id_san;
  let ten = req.body.ten_san;
  let hinhanh = req.body.hinh_anh;
  let mota = req.body.mo_ta;
  let machinhanh = req.body.id_chi_nhanh;
  let loaisan = req.body.id_loai_san;
  let giatien = req.body.gia_san;
  pool.query(
    "UPDATE san SET ten_san=?, hinh_anh=?, description=?, ma_chi_nhanh=?, ma_loai_san=?, gia_san=? WHERE ma_san=?",
    [ten, hinhanh, mota, machinhanh, loaisan, giatien, idsan],
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
  updateSan,
  createNew,
  Block,
  getAll,
  Delete,
  search,
  getById,
  getById2,
};
