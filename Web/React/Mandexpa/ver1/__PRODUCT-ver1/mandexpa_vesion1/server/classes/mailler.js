const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: true,
        auth: {
            user: 'ajeg971',
            pass: 'aj@!eg2011'
        }
    });

    let mailOptions = {
        from: '"Fred Foo 👻" <ozz.yeah@yahoo.com>',
        to: 'vantu19000@gmail.com', // list of receivers
        subject: 'Hello ddaay laf email test thoi ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Email sent to vantu19000@gmail.com?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', mailOptions.to);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});