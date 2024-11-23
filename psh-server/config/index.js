import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGO_URL,
  sms_api_key: process.env.SMS_API_KEY_VALUE,
  sms_sender_id: process.env.SMS_SENDER_ID,
  sms_api_host: process.env.SMS_API_HOST_SITE,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  nodemailer_auth_user_email: process.env.NODE_MAILER_AUTH_USER_EMAIL,
  nodemailer_auth_user_pass: process.env.NODE_MAILER_AUTH_USER_PASS,
  admin_email: process.env.ADMIN_EMAIL,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
