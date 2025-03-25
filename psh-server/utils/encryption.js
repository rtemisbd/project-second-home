
import CryptoJS from 'crypto-js';

const algorithm = "aes-256-ctr";
const secretKey = "defaultfallbackkeydefaultfallback12"; // 32 bytes (Correct ✅)

// Encrypt function
// Ensure secretKey is exactly 32 bytes (trim or pad)
// const key = crypto.createHash("sha256").update(secretKey).digest(); // Ensures 32 bytes


// Encrypt function
// export const encrypt = (data) => {
//   try {
//     const iv = crypto.randomBytes(16); // Secure random IV

//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     const encrypted = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);

//     // Return IV and encrypted data as hexadecimal strings
//     return {
//       iv: iv.toString("hex"),
//       content: encrypted.toString("hex"),
//     };
//   } catch (error) {
//     console.error("Encryption failed:", error);
//     return null;
//   }
// };

// Encrypt function
export function encrypt(data) {
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return cipherText;
}


