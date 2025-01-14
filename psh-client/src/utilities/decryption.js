// import crypto from "crypto-browserify";

// const secretKey = "go-to-sharikana08$@&&sha25601235";
// const algorithm = "aes-256-ctr";

// // Decrypt function
// export const decrypt = (encryptedData, iv) => {
//   if (!encryptedData || !iv) {
//     // console.error("Encrypted data or IV is missing");
//     return null;
//   }

//   try {
//     const decipher = crypto.createDecipheriv(
//       algorithm,
//       Buffer.from(secretKey, "utf-8"),
//       Buffer.from(iv, "hex")
//     );

//     let decrypted = Buffer.concat([
//       decipher.update(Buffer.from(encryptedData, "hex")),
//       decipher.final(),
//     ]);

//     return JSON.parse(decrypted.toString());
//   } catch (error) {
//     // console.error("Decryption failed:", error);
//     return null;
//   }
// };
