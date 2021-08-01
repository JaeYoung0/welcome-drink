import axios from "axios";
import CryptoJS from "crypto-js";

const sendSMS = async (req, res) => {
  const { body } = req;
  const { payload } = body;

  const timestamp = Date.now().toString();
  const SMS_SERVICE_ID = encodeURIComponent(process.env.SMS_SERVICE_ID);
  const NAVER_ACCESS_KEY_ID = process.env.NAVER_ACCESS_KEY_ID;
  const NAVER_SECRET_KEY = process.env.NAVER_SECRET_KEY;

  const makeSignature = () => {
    var space = " "; // one space
    var newLine = "\n"; // new line
    var method = "POST"; // method
    var url = `/sms/v2/services/${SMS_SERVICE_ID}/messages`;

    var hmac = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA256,
      NAVER_SECRET_KEY
    );
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(NAVER_ACCESS_KEY_ID);

    var hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  };

  const SIGNATURE = makeSignature();
  console.log("@@SIGNATURE", SIGNATURE);

  try {
    axios.post(
      `https://sens.apigw.ntruss.com/sms/v2/services/${SMS_SERVICE_ID}/messages`,
      {
        type: "SMS",
        from: "01090958697",
        content: "주문안내",
        messages: [
          {
            to: "01090958697",
            content: `${payload.device_model}에서 ${payload.name}를 주문했습니다 `,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-ncp-apigw-timestamp": timestamp,
          "x-ncp-iam-access-key": `${NAVER_ACCESS_KEY_ID}`,
          "x-ncp-apigw-signature-v2": SIGNATURE,
        },
      }
    );

    res.status(200).json({
      result: "success",
      name: `${payload.name} 메시지 전송완료`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export default sendSMS;
