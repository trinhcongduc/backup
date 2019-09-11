'use strict';
var Account = require('../models/account');

module.exports = [

    {

        method: 'GET',
        path: '/testlogger',
        config: {
            auth: false
        },
        handler: function(request,h) {
            var log4js = require('log4js');
            var logger = log4js.getLogger();
            logger.level = 'debug';
            logger.debug("Some debug messages");

            return "TEST loggwe XX";
        }
    },

    {

        method: 'GET',
        path: '/testemail',
        config: {
            auth: false
        },
        handler: function(request,h) {
            return "TEST DEPLOY PRODUCTION XX";
        }
    },

    {

        method: 'POST',
        path: '/runSql',
        config: {
            auth: false
        },
        handler: function(request,h) {

        }
    },

    {

        method: 'GET',
        path: '/runSql',
        config: {
            auth: false
        },
        handler: function(request,h) {
            return Account.query().select('*').then(accounts => {
                    console.log(accounts);
                    return {accounts};
                }).catch(err => {
                    return Boom.boomify(err, {statusCode: 422});
                });
        }
    },

    {
        method: 'GET',
        path: '/testemail2',
        config: {
            auth: false
        },
        handler: function(request,h) {
            const nodemailer = require('nodemailer');

            nodemailer.createTestAccount((err, account) => {
                console.log('_________________-');
                let transporter = nodemailer.createTransport({
                    host: 'smtp.sendgrid.net',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'ajeg971',
                        pass: 'aj@!eg2011'
                    }
                });

                let mailOptions = {
                    from: '"Email test 👻" <contact@mandexpa.com>', // sender address
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

            return "EMAIL ?";
        }
    },

];
