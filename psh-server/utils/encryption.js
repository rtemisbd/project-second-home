// import crypto from "crypto";
// import config from "../config/index.js";

// const algorithm = "aes-256-ctr";
// const iv = crypto.randomBytes(16);

// export const encrypt = (data) => {
//   const cipher = crypto.createCipheriv(algorithm, config.secretKey, iv);
//   const encrypted = Buffer.concat([
//     cipher.update(JSON.stringify(data)),
//     cipher.final(),
//   ]);
//   return { iv: iv.toString("hex"), content: encrypted.toString("hex") };
// };
