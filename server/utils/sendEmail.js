import nodemailer from "nodemailer";

import config from "../config/config";
import logger from "../config/logger";

const {
  SMTP_EMAIL,
  FROM_EMAIL,
  SMTP_HOST,
  SMTP_PASSWORD,
  FROM_NAME,
  SMTP_PORT,
  env,
} = config;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

const sendEmail = async (options) => {
  const message = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  const info = await transporter.sendMail(message);

  if (env === "development") {
    logger.info("Message sent: %s", info.messageId);
  }
};

export default { sendEmail, transporter };
