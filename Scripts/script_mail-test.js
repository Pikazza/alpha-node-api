 'use strict';
var nodemailer = require('nodemailer');
var Props = require('../Util/api-properties');
var my = require('yargs').argv;

var transporter = nodemailer.createTransport({
    pool: true,
    host: Props.mail.host,
    port: Props.mail.port,
    secure: true,
    auth: {
        user: Props.mail.senderMailId,
        pass: Props.mail.passWord
    }
});

function mailSender(ccMail) {

    var mailOptions = {
    from: '"'+Props.mail.senderName+'" <'+Props.mail.senderMailId+'>',
    to: ccMail,
    subject: 'Welcome To Pikazza',
    text: "Pikazza Test Mail"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

mailSender(my.param0);