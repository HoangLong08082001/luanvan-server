const pool = require("../../config/database");
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Thêm số 0 vào đầu nếu tháng < 10
  const day = String(today.getDate()).padStart(2, "0"); // Thêm số 0 vào đầu nếu ngày < 10

  return `${year}-${month}-${day}`;
};
const create = (req, res) => {
  let method = req.body.orderInfo;
  let half = req.body.amount;
  let total = req.body.total_amount;
  let id_tam_tinh = req.body.id_tam_tinh;
  try {
    pool.query(
      "INSERT INTO don_gia (ma_tam_tinh, tong_tien, tien_da_thanh_toan, phuong_thuc, trang_thai_thanh_toan, ngay_tao) VALUES(?,?,?,?,?,?)",
      [id_tam_tinh, total, half, method, 0, getTodayDate(new Date())],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data) {
          pool.query(
            `
                UPDATE tam_tinh_san SET trang_thai_tam_tinh=1 WHERE ma_tam_tinh=?
                `,
            [id_tam_tinh],
            (err, data) => {
              if (err) {
                throw err;
              }
              if (data) {
                pool.query(
                  `
                UPDATE tam_tinh_do_an SET trang_thai_tam_tinh=1 WHERE ma_tam_tinh=?;
                `,
                  [id_tam_tinh],
                  (err, data) => {
                    if (err) {
                      throw err;
                    }
                    if (data) {
                      pool.query(
                        `
                UPDATE tam_tinh_nuoc_uong SET trang_thai_tam_tinh=1 WHERE ma_tam_tinh=?;
                `,
                        [id_tam_tinh],
                        (err, data) => {
                          if (err) {
                            throw err;
                          }
                          if (data) {
                            pool.query(
                              `
                UPDATE tam_tinh_dung_cu_the_thao SET trang_thai_tam_tinh=1 WHERE ma_tam_tinh=?;
                `,
                              [id_tam_tinh],
                              (err, data) => {
                                if (err) {
                                  throw err;
                                }
                                if (data) {
                                  pool.query(
                                    `
                UPDATE tam_tinh_dung_cu_y_te SET trang_thai_tam_tinh=1 WHERE ma_tam_tinh=?;
                `,
                                    [id_tam_tinh],
                                    (err, data) => {
                                      if (err) {
                                        throw err;
                                      }
                                      if (data) {
                                        return res
                                          .status(200)
                                          .json({ message: "success" });
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "fails" });
  }
};
const getAll = (req, res) => {
  try {
    pool.query(
      "SELECT * FROM don_gia join tam_tinh on don_gia.ma_tam_tinh=tam_tinh.ma_tam_tinh join khach_hang on tam_tinh.ma_khach_hang = khach_hang.ma_khach_hang join tam_tinh_san on tam_tinh.ma_tam_tinh = tam_tinh_san.ma_tam_tinh join san on san.ma_san = tam_tinh_san.ma_san join khung_gio on tam_tinh_san.ma_khung_gio = khung_gio.ma_khung_gio join chi_nhanh on chi_nhanh.ma_chi_nhanh = san.ma_chi_nhanh join quan_huyen on quan_huyen.ma_quan_huyen=chi_nhanh.ma_quan_huyen GROUP BY don_gia.ma_don_gia;",
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
    return res.status(500).json({ message: "fails" });
  }
};

const getById = (req, res) => {
  let id = req.params.id;
  try {
    pool.query(
      "SELECT * FROM don_gia WHERE ma_don_gia=?",
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
const confrimPayment = (req, res) => {
  let id = req.body.id;
  let half = req.body.half;
  let price_return = req.body.price_return;
  try {
    pool.query(
      "UPDATE don_gia SET tien_da_thanh_toan=?, trang_thai_thanh_toan = 1 WHERE ma_don_gia=?",
      [parseInt(parseInt(half) + parseInt(price_return)), id],
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data) {
          return res.status(200).json({ message: "success" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "fails" });
  }
};
const getByMaKhachHang = async (req, res) => {
  let id = req.params.id;
  try {
    const queryDonGia = `
    SELECT * FROM don_gia
    WHERE ma_tam_tinh IN (
      SELECT ma_tam_tinh FROM tam_tinh WHERE ma_khach_hang = ?
    )
  `;

    // Query to get tam_tinh_san information
    const queryTamTinhSan = `
    SELECT * FROM tam_tinh_san tts
    JOIN san s ON tts.ma_san = s.ma_san join chi_nhanh on s.ma_chi_nhanh = chi_nhanh.ma_chi_nhanh join quan_huyen on chi_nhanh.ma_quan_huyen = quan_huyen.ma_quan_huyen join loai_san on s.ma_loai_san = loai_san.ma_loai_san join khung_gio on s.ma_san = khung_gio.ma_san
    WHERE tts.ma_tam_tinh IN (
      SELECT ma_tam_tinh FROM tam_tinh WHERE ma_khach_hang = ?
    )
  `;

    // Query to get tam_tinh_nuoc_uong information
    const queryTamTinhNuocUong = `
    SELECT nu.*, ln.* FROM tam_tinh_nuoc_uong ttnu
    JOIN nuoc_uong_loai nul ON ttnu.ma_nuoc_uong_loai = nul.ma_nuoc_uong_loai
    JOIN nuoc_uong nu ON nul.ma_nuoc_uong = nu.ma_nuoc_uong
    JOIN loai_nuoc_uong ln ON nul.ma_loai_nuoc_uong = ln.ma_loai_nuoc_uong
    WHERE ttnu.ma_tam_tinh IN (
      SELECT ma_tam_tinh FROM tam_tinh WHERE ma_khach_hang = ?
    )
  `;

    // Query to get tam_tinh_do_an information
    const queryTamTinhDoAn = `
    SELECT da.* FROM tam_tinh_do_an ttda
    JOIN do_an da ON ttda.ma_do_an = da.ma_do_an
    WHERE ttda.ma_tam_tinh IN (
      SELECT ma_tam_tinh FROM tam_tinh WHERE ma_khach_hang = ?
    )
  `;

    // Query to get tam_tinh_dung_cu_the_thao information
    const queryTamTinhDungCuTheThao = `
    SELECT dctt.* FROM tam_tinh_dung_cu_the_thao ttdctt
    JOIN dung_cu_the_thao dctt ON ttdctt.ma_dung_cu_the_thao = dctt.ma_dung_cu_the_thao
    WHERE ttdctt.ma_tam_tinh IN (
      SELECT ma_tam_tinh FROM tam_tinh WHERE ma_khach_hang = ?
    )
  `;

    // Query to get tam_tinh_dung_cu_y_te information
    const queryTamTinhDungCuYTe = `
    SELECT dcyt.* FROM tam_tinh_dung_cu_y_te ttdcyt
    JOIN dung_cu_y_te dcyt ON ttdcyt.ma_dung_cu_y_te = dcyt.ma_dung_cu_y_te
    WHERE ttdcyt.ma_tam_tinh IN (
      SELECT ma_tam_tinh FROM tam_tinh WHERE ma_khach_hang = ?
    )
  `;

    // Execute all queries in parallel
    pool.query(queryDonGia, [id], (err, resultsDonGia) => {
      if (err) throw err;

      pool.query(queryTamTinhSan, [id], (err, resultsTamTinhSan) => {
        if (err) throw err;

        pool.query(
          queryTamTinhNuocUong,
          [id],
          (err, resultsTamTinhNuocUong) => {
            if (err) throw err;

            pool.query(queryTamTinhDoAn, [id], (err, resultsTamTinhDoAn) => {
              if (err) throw err;

              pool.query(
                queryTamTinhDungCuTheThao,
                [id],
                (err, resultsTamTinhDungCuTheThao) => {
                  if (err) throw err;

                  pool.query(
                    queryTamTinhDungCuYTe,
                    [id],
                    (err, resultsTamTinhDungCuYTe) => {
                      if (err) throw err;

                      // Prepare response object
                      const data = {
                        don_gia: resultsDonGia,
                        tam_tinh_san: resultsTamTinhSan,
                        tam_tinh_nuoc_uong: resultsTamTinhNuocUong,
                        tam_tinh_do_an: resultsTamTinhDoAn,
                        tam_tinh_dung_cu_the_thao: resultsTamTinhDungCuTheThao,
                        tam_tinh_dung_cu_y_te: resultsTamTinhDungCuYTe,
                      };

                      return res.status(200).json(data);
                    }
                  );
                }
              );
            });
          }
        );
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "fails" });
  }
};
const getByMaHoaDon = async (req, res) => {
  // let ma_don_gia = req.params.id;

  // // Query to fetch don_gia details
  // const queryDonGia = `SELECT * FROM don_gia join tam_tinh on don_gia.ma_tam_tinh = tam_tinh.ma_tam_tinh join khach_hang on tam_tinh.ma_khach_hang = khach_hang.ma_khach_hang WHERE ma_don_gia = ?`;
  // pool.query(queryDonGia, [ma_don_gia], (err, resultsDonGia) => {
  //   if (err) {
  //     console.error("Error fetching don_gia: ", err);
  //     res.status(500).json({ error: "Error fetching data" });
  //     return;
  //   }

  //   if (resultsDonGia.length === 0) {
  //     res.status(404).json({ error: "Don gia not found" });
  //     return;
  //   }

  //   const donGia = resultsDonGia[0];
  //   const maTamTinh = donGia.ma_tam_tinh;

  //   // Query to fetch tam_tinh_san
  //   const queryTamTinhSan = `SELECT * FROM tam_tinh_san join san on tam_tinh_san.ma_san = san.ma_san join chi_nhanh on san.ma_chi_nhanh = chi_nhanh.ma_chi_nhanh join quan_huyen on chi_nhanh.ma_quan_huyen = quan_huyen.ma_quan_huyen join loai_san on san.ma_loai_san = loai_san.ma_loai_san join khung_gio on san.ma_san = khung_gio.ma_san WHERE tam_tinh_san.ma_tam_tinh = ?`;
  //   pool.query(queryTamTinhSan, [maTamTinh], (err, resultsTamTinhSan) => {
  //     if (err) {
  //       console.error("Error fetching tam_tinh_san: ", err);
  //       res.status(500).json({ error: "Error fetching data" });
  //       return;
  //     }

  //     const tamTinhSan = resultsTamTinhSan[0] || {};

  //     // Query to fetch tam_tinh_nuoc_uong
  //     const queryTamTinhNuocUong = `SELECT * FROM tam_tinh_nuoc_uong join nuoc_uong_loai on tam_tinh_nuoc_uong.ma_nuoc_uong_loai = nuoc_uong_loai.ma_nuoc_uong_loai join loai_nuoc_uong on loai_nuoc_uong.ma_loai_nuoc_uong = nuoc_uong_loai.ma_loai_nuoc_uong join nuoc_uong on nuoc_uong_loai.ma_nuoc_uong = nuoc_uong.ma_nuoc_uong WHERE ma_tam_tinh = ?`;
  //     pool.query(
  //       queryTamTinhNuocUong,
  //       [maTamTinh],
  //       (err, resultsTamTinhNuocUong) => {
  //         if (err) {
  //           console.error("Error fetching tam_tinh_nuoc_uong: ", err);
  //           res.status(500).json({ error: "Error fetching data" });
  //           return;
  //         }

  //         const tamTinhNuocUong = resultsTamTinhNuocUong[0] || {};

  //         // Query to fetch tam_tinh_dung_cu_the_thao
  //         const queryTamTinhDungCuTheThao = `SELECT * FROM tam_tinh_dung_cu_the_thao join dung_cu_the_thao on tam_tinh_dung_cu_the_thao.ma_dung_cu_the_thao = dung_cu_the_thao.ma_dung_cu_the_thao WHERE ma_tam_tinh = ?`;
  //         pool.query(
  //           queryTamTinhDungCuTheThao,
  //           [maTamTinh],
  //           (err, resultsTamTinhDungCuTheThao) => {
  //             if (err) {
  //               console.error(
  //                 "Error fetching tam_tinh_dung_cu_the_thao: ",
  //                 err
  //               );
  //               res.status(500).json({ error: "Error fetching data" });
  //               return;
  //             }

  //             const tamTinhDungCuTheThao = resultsTamTinhDungCuTheThao[0] || {};

  //             // Query to fetch tam_tinh_dung_cu_y_te
  //             const queryTamTinhDungCuYTe = `SELECT * FROM tam_tinh_dung_cu_y_te join dung_cu_y_te on tam_tinh_dung_cu_y_te.ma_dung_cu_y_te = dung_cu_y_te.ma_dung_cu_y_te WHERE ma_tam_tinh = ?`;
  //             pool.query(
  //               queryTamTinhDungCuYTe,
  //               [maTamTinh],
  //               (err, resultsTamTinhDungCuYTe) => {
  //                 if (err) {
  //                   console.error(
  //                     "Error fetching tam_tinh_dung_cu_y_te: ",
  //                     err
  //                   );
  //                   res.status(500).json({ error: "Error fetching data" });
  //                   return;
  //                 }

  //                 const tamTinhDungCuYTe = resultsTamTinhDungCuYTe[0] || {};

  //                 // Query to fetch tam_tinh_do_an
  //                 const queryTamTinhDoAn = `SELECT * FROM tam_tinh_do_an join do_an on tam_tinh_do_an.ma_do_an = do_an.ma_do_an WHERE ma_tam_tinh = ?`;
  //                 pool.query(
  //                   queryTamTinhDoAn,
  //                   [maTamTinh],
  //                   (err, resultsTamTinhDoAn) => {
  //                     if (err) {
  //                       console.error("Error fetching tam_tinh_do_an: ", err);
  //                       res.status(500).json({ error: "Error fetching data" });
  //                       return;
  //                     }

  //                     const tamTinhDoAn = resultsTamTinhDoAn[0] || {};

  //                     // Prepare response object
  //                     const data = {
  //                       don_gia: donGia,
  //                       tam_tinh_san: tamTinhSan,
  //                       tam_tinh_nuoc_uong: tamTinhNuocUong,
  //                       tam_tinh_dung_cu_the_thao: tamTinhDungCuTheThao,
  //                       tam_tinh_dung_cu_y_te: tamTinhDungCuYTe,
  //                       tam_tinh_do_an: tamTinhDoAn,
  //                     };
  //                     console.log(data);
  //                     return res.status(200).json(data);
  //                   }
  //                 );
  //               }
  //             );
  //           }
  //         );
  //       }
  //     );
  //   });
  // });
  
};
module.exports = {
  getByMaHoaDon,
  getByMaKhachHang,
  getById,
  create,
  getAll,
  confrimPayment,
};
