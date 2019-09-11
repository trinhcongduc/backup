'use strict'

const path = require('path');
const Fs = require('fs');
const Q = require('q');
const Handlebars = require('handlebars');
const Hoek = require('hoek');
const Markdown = require('nodemailer-markdown').markdown;
const Nodemailer = require('nodemailer');
const Hogan = require('hogan.js');

const Config = require('../config');

const internals = {};

module.exports = {
    plugin: {
        name: 'mailer',
        register
    }
}

internals.transport = Nodemailer.createTransport(Config.get('/nodemailer'))

console.log(internals.transport)

internals.transport.use('compile', Markdown({useEmbeddedImages: true}))

internals.templateCache = {}

internals.renderTemplate = function (signature, context) {

    try{
        const deferred = Q.defer();

        if (internals.templateCache[signature]) {
            deferred.resolve(internals.templateCache[signature](context))
        }

        const filePath = path.join(__dirname, '/../emails/', signature + '.html');
        const options = {encoding: 'utf-8'};

        Fs.readFile(filePath, options, (err, source) => {
            if (err) {
                // Log.debug('File Read Error:', err)
                deferred.reject(err)
            }


            internals.templateCache[signature] = Handlebars.compile(source)
            deferred.resolve(internals.templateCache[signature](context))
        })
        return deferred.promise
    }catch (e) {
        return e
    }


}

internals.sendEmail = function (options, template, context) {
    return internals
        .renderTemplate(template, context)
        .then(function (content) {
            const defaultEmail = Config.get('/defaultEmail');
            // const process_send =  Config.get('/nodemailer/sendmessage');

            // send to the default email address if it exists
            if (
                !(
                    Object.keys(defaultEmail).length === 0 &&
                    defaultEmail.constructor === Object
                )
            ) {
                options.to.address = defaultEmail
            }
            options = Hoek.applyToDefaults(options, {
                from: Config.get('/system/fromAddress'),
                html: content
            })

            // if(process_send){
                return internals.transport.sendMail(options);
            // }else{
            //     return null;
            // }


        })
        .catch(function (error) {
            console.log(error);
            throw error
        })
}


internals.sendEmailWithContent = function (options, content) {
    const defaultEmail = Config.get('/defaultEmail');

    // send to the default email address if it exists
    if (
        !(
            Object.keys(defaultEmail).length === 0 &&
            defaultEmail.constructor === Object
        )
    ) {
        options.to.address = defaultEmail
    }
    options = Hoek.applyToDefaults(options, {
        from: Config.get('/system/fromAddress'),
        html: content
    })
    return internals.transport.sendMail(options)
};

async function register(server, options) {
    server.expose('sendEmail', internals.sendEmail),
    server.expose('sendEmailWithContent', internals.sendEmailWithContent),
    server.expose('transport', internals.transport)
}

module.exports.sendEmail = internals.sendEmail
