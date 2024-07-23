const pool = require("../../config/database");

const getTotal = (req, res) => {
  pool.query(
    "SELECT SUM(don_gia.tien_da_thanh_toan) as tong_doanh_thu FROM don_gia",
    [],
    (err, data1) => {
      if (err) {
        throw err;
      }
      if (data1) {
        pool.query(
          "SELECT COUNT(khach_hang.ma_khach_hang) as tong_khach_hang FROM khach_hang",
          [],
          (err, data2) => {
            if (err) {
              throw err;
            }
            if (data2) {
              pool.query(
                "SELECT COUNT(don_gia.ma_don_gia) as tong_don_hang FROM don_gia",
                [],
                (err, data3) => {
                  if (err) {
                    throw err;
                  }
                  if (data3) {
                    return res.status(200).json({
                      tong_doanh_thu: data1,
                      tong_khach_hang: data2,
                      tong_don_hang: data3,
                    });
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

const getDoughnutChart = (req, res) => {
  pool.query(
    "SELECT MONTH(don_gia.ngay_tao) as thang, COUNT(don_gia.ma_don_gia) as tong_don_gia FROM don_gia GROUP BY DATE_FORMAT(don_gia.ngay_tao, '%Y-%m') ORDER BY DATE_FORMAT(don_gia.ngay_tao, '%Y-%m');",
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
};

const getBarChart = (req, res) => {
  pool.query(
    "SELECT MONTH(don_gia.ngay_tao) as thang, COUNT(don_gia.ma_don_gia) as tong_don_gia FROM don_gia GROUP BY DATE_FORMAT(don_gia.ngay_tao, '%Y-%m') ORDER BY DATE_FORMAT(don_gia.ngay_tao, '%Y-%m');",
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
};


module.exports = { getTotal, getDoughnutChart, getBarChart };
