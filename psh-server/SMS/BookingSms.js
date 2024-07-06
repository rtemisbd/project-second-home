import pkg from "follow-redirects";
const { http } = pkg;

export function bookingSms(bookingMessage) {
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
