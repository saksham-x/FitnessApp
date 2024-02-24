const nodemailer = require('nodemailer')
require('dotenv').config()
const sendverifymail = async (name, email, otp, subject) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.APP_PASS
      }
    })
    let details = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      html: generateEmailTemplate(name, otp)
    }
    mailTransporter.sendMail(details, function (error, info) {
      if (error) {
        console.log("wrong email")
      }
      else {
        console.log("email has been sent", info.response)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = sendverifymail

const generateEmailTemplate = (name, otp) => {
  return `
    <html>
    <head>
      <style>
        / Define your email styles here /
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .header {
          background-color: #f0f0f0;
          padding: 10px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 20px 0;
        }
        .footer {
          background-color: #f0f0f0;
          padding: 10px;
          text-align: center;
          border-radius: 0 0 10px 10px;
        }
      </style>
    </head>
    <body>
    <div class="content">
        <p>Dear ${name},</p>
        <p>Thank you for joining our Home Workout and Diet Generator App!</p>
        <p>Your OTP (One-Time Password) is: <strong>${otp}</strong></p>
        <p>We are thrilled to have you on board and look forward to enhance your fitness journey.</p>
      </div>
      <div class="footer">
        <p>Best of luck,</p>
        <p>Home Workout and Diet Generator App</p>
      </div>
      </div>
    </body>
  </html>
`
}