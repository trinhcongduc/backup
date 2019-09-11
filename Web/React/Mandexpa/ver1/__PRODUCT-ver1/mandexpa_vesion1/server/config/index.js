'use strict'

const Confidence = require('confidence');
const constants = require('./constant');
const Dotenv = require('dotenv');
const dateConfig = require('./globalConfig/dateConfig');
const pusherConfig = require('./globalConfig/pusherConfig');
const objectConfig = require('./objectConfig');
const languages =  require('../languages');
// const path = require('path')

Dotenv.config({silent: true});

/**
 * NOTE: Only secrets and values affected by the environment (not NODE_ENV) are stored in .env files. All other values
 * are defined here.
 */

// The criteria to filter config values by (NODE_ENV). Typically includes:
//  - local
//  - development
//  - production
//  - $default

const criteria = {
    env: process.env.NODE_ENV
};

// These values stay the same regardless of the environment.

const config = {
    $meta: 'This file configures the appy API.',
    constants: constants,
    language:languages.fr,
    projectName: constants.API_TITLE,
    emailAdmin:'trinhcongduc1998@gmail.com',
    URL_SERVER:'http://34.222.116.231',
    key_pdfshift:'79b19df08c7d47ee8155340793fdea73',
    port: {
        $filter: 'env',
        production: 2603,
        $default: 2603
    },

    jwtSecret: {
        $filter: 'env',
        production: process.env.JWT_SECRET,
        $default: process.env.JWT_SECRET
    },

    users:{
        permission:{
            // ADMIN:'admin',
            // ADMIN:'admin',
            // ADMIN:'admin',
            // ADMIN:'admin',
        }
    },

    nodemailer: {
        $filter: 'env',
        sendmessage:true,
        production: {
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
                user: 'ajeg971',
                pass: 'aj@!eg2011'
            }
        },
        $default: {
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
                user: 'ajeg971',
                pass: 'aj@!eg2011'
            }
        }
    },

    emailTemplate: {
        $filter: 'env',
        production: {
            createAccount: {
                subject: 'Votre compte Mandexpa a été créé',
                template: 'create-account'
            },
            updateAccount: {
                subject: 'Votre compte Mandexpa a été modifié',
                template: 'update-account'
            },
            deleteAccount: {
                subject: 'Votre compte Mandexpa a été supprimé',
                template: 'delete-account'
            },
            forgetPassword: {
                subject: 'Forgot Password',
                template: 'forgot-password'
            },
            deleteContact: {
                subject: 'DELETE CONTACT',
                template: 'delete-contact'
            },
            createProperty: {
                subject : 'Votre bien est publié sur Mandexpa',
                template : 'create-property'
            },
            updateMarketingProperty: {
                subject : 'Request update marketing your property from agency',
                template : 'update-marketing-property'
            },
            createAgenda: {
                subject : 'Request create agenda from agency',
                template : 'create-agenda'
            },
            acceptAgenda : {
                subject : 'Request accept agenda from agency',
                template : 'accept-agenda'
            },
            declineAgenda : {
                subject : 'Request decline agenda from agency',
                template : 'decline-agenda'
            },
            listMatching : {
                subject : 'Results in property match',
                template : 'list_property_matches/create_property_match'
            },
            newInvoice : {
                subject : 'A new invoice for you created',
                template : 'new-invoice'
            },
            cancelProperty:{
                subject : 'User cancel property',
                template : 'cancel-property'
            }

        },
        $default: {
            createAccount: {
                subject: 'Votre compte Mandexpa a été créé',
                template: 'create-account'
            },
            updateAccount: {
                subject: 'Votre compte Mandexpa a été modifié',
                template: 'update-account'
            },
            deleteAccount: {
                subject: 'Votre compte Mandexpa a été supprimé',
                template: 'delete-account'
            },
            deleteContact: {
                subject: 'Votre compte a été supprimé de Mandexpa',
                template: 'delete-contact'
            },
            recevieMail: {
                subject: 'Demande de désabonnement des Property match',
                template: 'recevie-mail'
            },
            forgetPassword: {
                subject: 'Forgot Password',
                template: 'forgot-password'
            },
            createProperty: {
                subject : 'Votre bien est publié sur Mandexpa',
                template : 'create-property'
            },
            deleteProperty: {
                subject : 'Votre bien est supprimé de Mandexpa',
                template : 'delete-property'
            },
            updateMarketingProperty: {
                subject : 'Nouveaux liens publicitaires pour votre bien',
                template : 'update-marketing-property'
            },
            createAgenda: {
                subject : ' souhaite visiter votre bien ID',
                template : 'create-agenda'
            },
            acceptAgenda : {
                subject : ' a accepté votre demande de visite',
                template : 'accept-agenda'
            },
            declineAgenda : {
                subject : ' a refusé votre demande de visite',
                template : 'decline-agenda'
            },
            listMatching : {
                subject : 'Résultats de votre Property Match',
                template : 'list_property_matches/create_property_match'
            },
            newInvoice : {
                subject : 'Votre facture Mandexpa est disponible',
                template : 'new-invoice'
            },
            cancelProperty:{
                subject : 'User cancel property',
                template : 'cancel-property'
            },
            test_mailer:{
                subject : 'Here is mail test',
                template : 'test'
            },
            collaborateVadidate:{
                subject : 'a validé le rapport de transaction du bien',
                template : 'collaborate-vadidate'
            },
            collaborateSolo:{
                subject : 'a finalisé le rapport de transaction du bien',
                template : 'collaborate-solo'
            },
            collaborateRequest:{
                subject : 'a complété le rapport de transaction du bien',
                template : 'collaborate-request'
            },
            collaborateConfirm:{
                subject : 'a finalisé le rapport de transaction du bien',
                template : 'collaborate-confirm'
            }
        }
    },

    /**
     * config date from Server side
     */
    dateConfig:{
        timezone : dateConfig.timezone.VI,
        date_format:{
            date_format_default : dateConfig.DateFormat.dateSaveDB,
            datetime_format_default : dateConfig.DateFormat.datetimeSaveDB,
            date_saveTo_db : dateConfig.DateFormat.dateSaveDB,
            date_display : dateConfig.DateFormat.date_display,
            datetime_display : dateConfig.DateFormat.datetimeDisplay,
        }
    },

    /**
     * Parameter Config notify
     */
    pusherConfig:pusherConfig,

    /**
     * Property config
     */
    propertyConfig: objectConfig.property,

    /**
     * Subscription config
     */
    subscriptionConfig: objectConfig.subscription,


    /**
     * defaultEmail:
     * If set to null, outgoing emails are sent to their actual address,
     * otherwise outgoing emails are sent to the defaultEmail
     */
    defaultEmail: {
        $filter: 'env',
        production: null,
        $default: null
    },
    system: {
        $filter: 'env',
        production: {
            fromAddress: {
                name: 'Mandexpa',
                address: 'mandexpa@mandexpa.com'
            },
            toAddress: {
                name: 'appy',
                address: 'vantu19000@gmail.com'
            }
        },
        $default: {
            fromAddress: {
                name: 'Mandexpa',
                address: 'mandexpa@mandexpa.com'
            },
            toAddress: {
                name: 'appy',
                address: 'trinhcongduc1998@gmail.com'
            }
        }
    },
    clientURL: {
        $filter: 'env',
        production: process.env.CLIENT_URI,
        $default: process.env.CLIENT_URI
    },
    // If true, the 'demoAuth' policy is used to restrict certain actions.
    enableDemoAuth: {
        $filter: 'env',
        production: true,
        $default: true
    },

};


const store = new Confidence.Store(config)
exports.get = function (key) {
    return store.get(key, criteria)
};
exports.meta = function (key) {
    return store.meta(key, criteria)
};
