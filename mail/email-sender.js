const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.GODAN_SMTP_HOST,
    port: process.env.GODAN_SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.GODAN_SMTP_USER,
      pass: process.env.GODAN_SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    const message = {
      from: process.env.GODAN_FROM_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.message,
    };

    const m = await transporter.sendMail(message);
    console.log(m);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = sendEmail;
