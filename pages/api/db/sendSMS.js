import axios from "axios";
import CryptoJS from "crypto-js";

const sendSMS = async (req, res) => {
  const { body } = req;
  const { payload } = body;

  const timestamp = Date.now().toString();
  const SMS_SERVICE_ID = encodeURIComponent(process.env.SMS_SERVICE_ID);
  const NAVER_ACCESS_KEY_ID = process.env.NAVER_ACCESS_KEY_ID;
  const NAVER_SECRET_KEY = process.env.NAVER_SECRET_KEY;

  const CLOCKER_PHONE_NUMBER = "01092870864";
  const JY_PHONE_NUMBER = "01090958697";

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

  const MESSAGE_CONTENT = `방금 ${payload.device_model}에서 주문했어요 - "${payload.name}"`;

  try {
    axios.post(
      `https://sens.apigw.ntruss.com/sms/v2/services/${SMS_SERVICE_ID}/messages`,
      {
        type: "SMS",
        from: JY_PHONE_NUMBER,
        content: "주문안내",
        messages: [
          // {
          //   to: CLOCKER_PHONE_NUMBER,
          //   content: `${payload.device_model}에서 ${payload.name}를 주문했습니다 `,
          // },
          {
            to: JY_PHONE_NUMBER,
            content: MESSAGE_CONTENT,
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
      message: MESSAGE_CONTENT,
      timestamp: timestamp,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export default sendSMS;
