const crypto = require("crypto");
const axios = require("axios");
const MomoPayment = async (req, res) => {
  const endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

  const {
    partnerCode,
    accessKey,
    secretKey,
    orderId,
    orderInfo,
    amount,
    ipnUrl,
    redirectUrl,
    extraData,
    tongtien,
    ngaytao
  } = req.body;

  const requestId = Date.now().toString();
  const requestType = "payWithATM";
  const rawHash = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawHash)
    .digest("hex");

  const data = {
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang: "vi",
    extraData,
    requestType,
    signature,
    tongtien,
    ngaytao,
  };

  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });
    const jsonResult = response.data;

    if (jsonResult.payUrl) {
      res.status(200).json({ payUrl: jsonResult.payUrl });
    } else {
      res.status(400).json({ error: "Payment URL not found in the response." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const callBack = (req, res) => {
  console.log(req.body);
  try {
    return res.status(200).json({ code: "0", data: req.body });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { MomoPayment, callBack };
