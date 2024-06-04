var nodemailer = require("nodemailer");
const express = require('express');
const app = express.Router();
const cors = require('cors');

var MAIL_SUPP = process.env.MAIL_SUPP || 'project.area.epitech@gmail.com';
var MAIL_SUPP_PASSWORD = process.env.MAIL_SUPP_PASSWORD || '';

app.use(cors());

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_SUPP,
    pass: MAIL_SUPP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/sendmail", async (req, res) =>{
    const recipient = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    var mailOptions = {
        from: MAIL_SUPP,
        to: recipient,
        subject: 'AREA REACTION GMAIL: ' + subject,
        text: message,
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
        return res.send({
            message: "ERROR",
            status: 405
        });
    } else {
        return res.send({
            message: "Email successfully sent",
            status: 200
        });
    }
    });
});
