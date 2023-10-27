const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    pool: true,
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    },
});

const sendEmail = async ({ email, text, content }) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Please verify your email',
        html: `
          <div>
            ${text}
          </div>
          `,
          attachments: [{
            filename: "file.mp3",
            content
        }]
      }
    const resp = await transporter.sendMail(mailOptions);
    return resp
}

module.exports = {
    sendEmail
}