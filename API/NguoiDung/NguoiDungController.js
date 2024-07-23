const bcrypt = require("bcrypt");
const pool = require("../../config/database");
const { createJwtWebsite } = require("../../middleware/JWTAction");
const nodemailer = require("nodemailer");
const salt = 10;
const randomNumberCodeVerfify = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const createNew = (req, res) => {
  let ten_nguoi_dung = req.body.ten_nguoi_dung;
  let email = req.body.email;
  let password = req.body.password;
  let sodienthoai = req.body.sodienthoai;
  pool.query(
    "SELECT * FROM khach_hang WHERE email=? OR so_dien_thoai=?",
    [email, sodienthoai],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        return res
          .status(400)
          .json({ message: "Email hoặc số điện thoại này đã tồn tại" });
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          if (hash) {
            pool.query(
              "INSERT INTO khach_hang( ten_khach_hang,email,password, so_dien_thoai) VALUES (?,?,?,?)",
              [ten_nguoi_dung, email, hash, sodienthoai],
              (err, data) => {
                if (err) {
                  throw err;
                }
                if (data) {
                  pool.query(
                    "INSERT INTO `tam_tinh` (`ma_khach_hang`,`thanh_toan`) VALUES (?,?)",
                    [data.insertId, 0],
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
        });
      }
    }
  );
};
const Login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    pool.query(
      "SELECT * FROM khach_hang WHERE email=?",
      [username],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          bcrypt.compare(password, data[0].password, (err, data) => {
            if (err) {
              throw err;
            }
            if (data) {
              pool.query(
                "SELECT * FROM khach_hang join tam_tinh on khach_hang.ma_khach_hang=tam_tinh.ma_khach_hang WHERE email = ? AND tam_tinh.thanh_toan=0",
                [username],
                (err, data) => {
                  if (err) {
                    throw err;
                  }
                  if (data.length > 0) {
                    let listdata = data[0];
                    let payload = {
                      username: username,
                      data: data[0],
                    };
                    let token = createJwtWebsite(payload);

                    return res.status(200).json({
                      message: "success",
                      access_token: token,
                      data: listdata,
                    });
                  }
                }
              );
            }
            if (!data) {
              return res.status(400).json({ message: "Password không hợp lệ" });
            }
          });
        } else {
          return res.status(400).json({ message: "Email không hợp lệ" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
const getAll = (req, res) => {
  try {
    pool.query("SELECT * FROM khach_hang", [], (err, data) => {
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
const getById = (req, res) => {
  let id = req.params.id;
  pool.query(
    "SELECT * FROM chi_nhanh WHERE ma_chi_nhanh=?",
    [id],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        return res.status(200).json(data);
      }
    }
  );
};
const sendMail = (req, res) => {
  let email = req.body.email;
  console.log(email);
  try {
    pool.query(
      "SELECT * FROM khach_hang WHERE email = ?",
      [email],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          res.status(200).json({ message: "success" });
          const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: "gmail",
            secure: false,
            auth: {
              user: "dathuu0129@gmail.com",
              pass: "frbsnjhbuouqfcir",
            },
          });
          // Thiết lập email options
          const mailOptions = {
            from: "dathuu0129@gmail.com", // Địa chỉ email của người gửi
            to: `${email}`, // Địa chỉ email của người nhận
            subject: "CẤP LẠI MẬT KHẨU", // Tiêu đề email
            text: `ĐỂ THAY ĐỔI MẬT KHẢU, BẠN VUI LÒNG TRUY CẬP ĐƯỜNG DẪN http://localhost:3000/new-password-page/${email}`, // Nội dung email
          };
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              throw error;
            }
            if (info) {
              console.log(info);
            }
          });
        } else {
          return res.status(400).json({ message: "Email này không tồn tại" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "error system" });
  }
};
const renew = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      if (hash) {
        pool.query(
          "UPDATE khach_hang SET password=? WHERE email=?",
          [hash, email],
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
    return res.status(500).json({ message: "error" });
  }
};
const getAllById = (req, res) => {
  let id = req.params.id;
  try {
    pool.query(
      "SELECT * FROM khach_hang WHERE ma_khach_hang = ?",
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
    return res.status(500).json({ message: "fails" });
  }
};
module.exports = {
  getAllById,
  sendMail,
  renew,
  getById,
  createNew,
  Login,
  getAll,
};
