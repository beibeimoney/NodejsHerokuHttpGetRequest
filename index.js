var express = require('express');
var request = require('request');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport")
var app = express();


app.set('port', (process.env.PORT || 5000));
app.set('verify_token_gmail', (process.env.VERIFY_TOKEN_GMAIL));
app.set('adress_gmail', (process.env.ADRESS_GMAIL));
app.set('to_gmail_adress', (process.env.TO_GMAIL_ADRESS));
app.set('page_access_token', (process.env.PAGE_ACCESS_TOKEN));

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    secureConnection: true,
    port: 587,
    auth: {
        user: app.get('adress_gmail'),
        pass: app.get('verify_token_gmail')
    }
}));

app.get('/', function(req, res) {
    res.send('<marquee>Calisiyor! yakutozcan.blogspot.com 👻</marquee>');
    console.log(app.get('adress_gmail'));
    console.log(app.get('verify_token_gmail'));
});
app.get('/sendmail', function(req, res) {
    console.log(req.param('page_access_token'));
    if (req.param('page_access_token') == app.get('page_access_token')) {
        res.send('1:Dogrulama kodu doğru');
        var mailOptions = {
            from: app.get('adress_gmail'),
            to: app.get('to_gmail_adress'),
            subject: "Heroku "+req.param('subject'),
            text: req.param('message') +" Date"+ getDateTime(),
            //html: "HTML GENERATED",
            /* attachments : [
                {   // file on disk as an attachment
                    filename: 'text3.txt',
                    path: 'Your File path' // stream this file
                 }
             ]
             */
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                console.log(response.response.toString());
                res.end("sent");
            }
        });
    } else {
        res.send('0:Dogrulama kodu hatali');
    }
});

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return hour + ":" + min + ":" + sec + " | " + day + "/" + month + "/" + year;
}


app.listen(app.get('port'), function() {
    console.log('Node calisiyor: ', app.get('port'));
});
