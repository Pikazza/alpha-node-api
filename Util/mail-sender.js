'use strict';
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var fs = require('fs');
var Props = require('./api-properties');


var filePath = function(mailType){
    if(mailType=="REG_TRADER")
        return __dirname +'/mail-templates/registration-trader.html';
    else if(mailType=="REG_CUSTOMER")
        return __dirname +'/mail-templates/registration-customer.html';
    else if(mailType=="FORGOT_PASSWORD")
        return __dirname +'/mail-templates/forgot-password.html';
}

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

var mailSender = function (email,Pass,tempPass,mailType) {

    var ccMail=',prabakaran@madebyfire.com';
    var party= {
        authId:email,
        authToken:Pass,
        tempAuthToken:tempPass
    };
    var path = filePath(mailType);
    var htmlContent = ejs.render(fs.readFileSync(path, 'utf8'),{party: party});
    var mailOptions = {
    from: '"'+Props.mail.senderName+'" <'+Props.mail.senderMailId+'>',
    to: party.authId+ccMail,
    subject: 'Welcome To HaoChii',
    html:  htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

module.exports = {
	MailSender: mailSender
}