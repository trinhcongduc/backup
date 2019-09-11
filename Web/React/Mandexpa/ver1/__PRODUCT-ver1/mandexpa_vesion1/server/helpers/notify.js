const Config = require('../config');



/**
 * Check duplicate account when create new account
 * @param email
 * @returns {Promise<boolean>}
 */

exports.checkAccountEmail =  async (email)=>{
    const Account = require('../models/account');
    let account  =  await Account.query().select("email").where("email",'like',email).where('state','<>',0);
    if(typeof account === "undefined" || account === null || account.length === 0){
        return true;
    }else{
        return false;
    }
};

/**
 * Function send mail with sample template
 * @param template
 * @param context
 * @param receivers
 * @param req
 * @returns {*}
 */
exports.sendMail = async (template,receivers,context,req,type=1) =>{
    try {
        const constants = Config.get('/constants');
        const mailer = req.server.plugins.mailer;
        const emailOptions = {
            subject: template.subject,
            to: receivers
        };
        let _context = context;

        // add web name to context
        _context = Object.assign(_context,{websiteName: constants.WEB_NAME});
        mailer.sendEmail(emailOptions, template.template, _context);
    } catch (err) {
        console.log("==========>ERROR FUNCTION SEND MAIL",err);
        return err;    }
};