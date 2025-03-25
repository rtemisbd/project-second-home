import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.DECRYPT_SECRET_KEY;



// Decrypt function
export function decrypt(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
}