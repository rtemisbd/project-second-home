import pkg from "follow-redirects";
import config from "../config/index.js";

const { http } = pkg;

export function bookingSms(phone, bookingId) {
  // Phone Sms For Booking
  const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${phone}&senderid=${config.sms_sender_id}&message=Thank%20you%20for%20choosing%20us!%20Your%20booking%20ID%3A%23${bookingId}%20is%20received.%20Our%20team%20will%20verify%20your%20information%20before%20confirming%20your%20booking.%20Call%20us:%2001647647404.%20-%20PSH`;

  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      hostname: "bulksmsbd.net",
      path: bookingMessage,
      headers: {},
      maxRedirects: 20,
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve(body.toString());
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.end();
  });
}
