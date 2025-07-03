import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  encryption_secret_key: process.env.ENCRYPTION_SECRET_KEY,
  database_url: process.env.MONGO_URL,
  server_url: process.env.server_site_url,
  client_url: process.env.client_site_url,
  sms_api_key: process.env.SMS_API_KEY_VALUE,
  sms_sender_id: process.env.SMS_SENDER_ID,
  sms_api_host: process.env.SMS_API_HOST_SITE,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  user_default_password: process.env.USER_DEFAULT_PASSWORD,
  nodemailer_auth_user_email: process.env.NODE_MAILER_AUTH_USER_EMAIL,
  nodemailer_auth_user_pass: process.env.NODE_MAILER_AUTH_USER_PASS,
  admin_email: process.env.ADMIN_EMAIL,
  bkash_userName: process.env.BKASH_USERNAME,
  bkash_password: process.env.BKASH_PASSWORD,
  bkash_api_key: process.env.BKASH_API_KEY,
  bkash_secret_key: process.env.BKASH_SECRET_KEY,
  bkash_grant_token_url: process.env.bkash_grant_token_url,
  bkash_refresh_token_url: process.env.bkash_refresh_token_url,
  bkash_create_payment_url: process.env.bkash_create_payment_url,
  bkash_execute_payment_url: process.env.bkash_execute_payment_url,
  bkash_refund_transaction_url: process.env.bkash_refund_transaction_url,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
