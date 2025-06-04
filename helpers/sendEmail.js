import nodemailer from "nodemailer";

const { GMX_USER, GMX_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "mail.gmx.net",
  port: 465,
  secure: true,
  auth: {
    user: GMX_USER,
    pass: GMX_PASS,
  },
});

const sendEmail = async ({ data, html }) => {
  const mailOptions = {
    from: "easyring.delivery@gmx.de",
    to: data.to,
    subject: data.subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error:", error);
    }
    console.log("Email has been sent:", info.response);
  });
};

export default sendEmail;
