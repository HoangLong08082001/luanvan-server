const pool = require("../../config/database");
const randomNumberCodeVerfify = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const getNuocUong = (req, res) => {
  try {
    pool.query(
      "SELECT * FROM nuoc_uong_loai join loai_nuoc_uong on loai_nuoc_uong.ma_loai_nuoc_uong = nuoc_uong_loai.ma_loai_nuoc_uong join nuoc_uong on nuoc_uong.ma_nuoc_uong = nuoc_uong_loai.ma_nuoc_uong",
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
  } catch (error) {
    return res.status(500).json({ message: "ERROR" });
  }
};
const getCategory = (req, res) => {
  try {
    pool.query("SELECT * FROM loai_nuoc_uong", [], (err, data) => {
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
const getLoaiNuoc = (req, res) => {
  try {
    pool.query("SELECT * FROM loai_nuoc_uong", [], (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        return res.status(200).json(data);
      }
    });
  } catch (error) {}
};
const createNew = (req, res) => {
  let ten = req.body.ten;
  let soluong = req.body.soluong;
  let maloai = req.body.maloai;
  let hinhanh = req.body.hinhanh;
  let gia = req.body.gia;
  console.log(ten);
  console.log(soluong);
  console.log(maloai);
  console.log(hinhanh);
  console.log(gia);
  pool.query(
    "SELECT * FROM nuoc_uong WHERE ten_nuoc_uong=?",
    [ten],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        return res.status(400).json({ message: "Loại nước này đã tồn tại" });
      } else {
        pool.query(
          "INSERT INTO nuoc_uong( ten_nuoc_uong, so_luong_kho) VALUES (?,?)",
          [ten, soluong],
          (err, data) => {
            if (err) {
              throw err;
            }
            if (data) {
              console.log(data);
              pool.query(
                "INSERT INTO nuoc_uong_loai( ma_nuoc_uong, ma_loai_nuoc_uong, hinh_anh, trang_thai, gia_nuoc) VALUES(?,?,?,?,?)",
                [data.insertId, maloai, hinhanh, 0, gia],
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
      }
    }
  );
};
const BlockNuocUong = (req, res) => {
  let manuocuong = req.body.id_nuoc_uong;
  pool.query(
    "SELECT * FROM nuoc_uong_loai WHERE ma_nuoc_uong_loai=?",
    [manuocuong],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        if (data[0].trang_thai === 0) {
          pool.query(
            "UPDATE nuoc_uong_loai SET trang_thai=1 WHERE ma_nuoc_uong_loai=?",
            [manuocuong],
            (err, data) => {
              if (res) {
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
            "UPDATE nuoc_uong_loai SET trang_thai=0 WHERE ma_nuoc_uong_loai=?",
            [manuocuong],
            (err, data) => {
              if (res) {
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
};
const Delete = (req, res) => {
  let ma_nuoc_uong = req.params.id;

  try {
    pool.query(
      "DELETE FROM nuoc_uong_loai WHERE ma_nuoc_uong_loai=?",
      [ma_nuoc_uong],
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
};const getById = (req, res) => {
  let id = req.params.id;
  pool.query(
    "SELECT * FROM nuoc_uong_loai join loai_nuoc_uong on loai_nuoc_uong.ma_loai_nuoc_uong = nuoc_uong_loai.ma_loai_nuoc_uong join nuoc_uong on nuoc_uong.ma_nuoc_uong = nuoc_uong_loai.ma_nuoc_uong WHERE ma_nuoc_uong_loai=?",
    [id],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length>0) {
        return res.status(200).json(data);
      }
    }
  );
};
const updateNuocUong = (req,res)=>{
  let ten = req.body.ten_nuoc_uong;
  let soluong = req.body.so_luong;
  let maloai = req.body.ma_loai_nuoc_uong;
  let hinhanh = req.body.hinh_anh;
  let gia = req.body.gia;
  let idnuoc= req.body.ma_nuoc_uong_loai;
  
}
module.exports = {
  getNuocUong,
  getLoaiNuoc,
  getCategory,
  createNew,
  BlockNuocUong,
  Delete,
  getById,
};
