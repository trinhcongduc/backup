/**
 *  Manager action send invoice to user book a Property
 */


const request = require('request');
const Boom = require('boom');
const Helper = require('../helpers');
const Config = require('../config');
const Property = require("../models/propertyModel/property");
const PropertyReorder = require("../models/propertyModel/property_reorder");

const invoice_percent_sub_total = Config.get('/propertyConfig/pirceConfig/invoice_percent_sub_total');
const invoice_percent_tva = Config.get('/propertyConfig/pirceConfig/invoice_percent_tva');

/**
 * Function create order invoices during the day
 * @param req
 * @param h
 * @returns {Promise<*>}
 */
exports.createInvoice = async (req,h) =>{
    try{
        const currentDate = Helper.dateHelper.getDateTimeZone();
        let queryBuilder =  Property.query().select('property.*','property_reorder.date_sale',
            'property_reorder.seller_id','property_reorder.buyer_id',
            'location.postal_code',
            'regions.title as property_town',
            'seller.reason_social as seller_reason_social','seller.firstname as seller_firstname',
            'seller.lastname as seller_lastname','seller.address as seller_address','seller.postalcode as seller_postalcode',
            'seller.city as seller_city','seller.mobile as seller_mobile','seller.email as seller_email',

            'buyer.reason_social as buyer_reason_social','buyer.firstname as buyer_firstname',
            'buyer.lastname as buyer_lastname','buyer.address as buyer_address','buyer.postalcode as buyer_postalcode',
            'buyer.city as buyer_city','buyer.mobile as buyer_mobile','buyer.email as buyer_email',
            ).from('property');

        queryBuilder.leftJoin('property_location as location ',function () {
            this.on('location.property_id','=','property.id')
        });
        queryBuilder.leftJoin('regions',function () {
            this.on('regions.id','=','location.town')
        });

        queryBuilder.leftJoin('property_reorder',function () {
            this.on('property.id','=','property_reorder.property_id')
        });

        queryBuilder.leftJoin('account as seller',function(){
            this.on('seller.id','=','property_reorder.seller_id')
        });

        queryBuilder.leftJoin('account as buyer',function() {
            this.on('buyer.id', '=', 'property_reorder.buyer_id')
        });
        queryBuilder.where('property_reorder.date_sale',currentDate);
        queryBuilder.andWhere(function () {
            this.orWhere('property.status_mandate',Config.get('/propertyConfig/status_property/sale/SOLD'));
            this.orWhere('property.status_mandate',Config.get('/propertyConfig/status_property/sale/NEGOTIATING'));
        });
        // queryBuilder.andWhere(function () {
        //     this.orWhere('property.status_mandate',Config.get('/propertyConfig/status_property/sale/SOLD'))
        //     this.orWhere('property.status_mandate',Config.get('/propertyConfig/status_property/sale/NEGOTIATING'))
        //     this.orWhere('property.status_mandate',Config.get('/propertyConfig/status_property/sale/SOLD'))
        // });
        const results = await queryBuilder;
        let paths = [];
        if(results.length ){
            let endfix = Helper.dateHelper.getDateTimeZone('now',"D/MM");
            let email_template = Config.get('/emailTemplate/newInvoice');
            results.forEach( async (item)=>{
                console.log("------->>")
                let datas = {};
                let path_seller_invoice = null;
                let path_buyer_invoice = null;
                datas.date_create =  Helper.dateHelper.getDateTimeZone('now',Config.get('/dateConfig/date_format/date_display'));
                datas.property_price = item.number_pay;
                datas.property_address = item.street_name + " " + item.property_town + " ";

                // Create invoice and send mail for seller
                if(item.seller_id){
                    //fill data
                    datas.invoice_number = Helper.propertyHelper.create_unique_invoice_number()+endfix.replace('/','');
                    datas.staff_full_name = item.seller_firstname+ " " + item.seller_lastname;
                    datas.companyname = item.seller_reason_social;
                    datas.address = item.seller_address;
                    datas.zipcode = item.seller_postalcode;
                    datas.city = item.seller_city;
                    datas.phone = item.seller_mobile;
                    datas.commission_amount = (item.total_commission_inclusive * (item.commission_seller / 100)).toFixed(2);
                    datas.sub_total = (datas.commission_amount * (invoice_percent_sub_total /100)).toFixed(2);
                    datas.tva_commission  = datas.sub_total * (invoice_percent_tva /100);
                    datas.total = parseFloat(datas.sub_total) + parseFloat(datas.tva_commission) ;

                    // create invoice
                    let filename = "seller_invoice_"+endfix.replace('/','_')+".docx";
                    path_seller_invoice = Helper.upload.renderWordFile(datas,filename,'store/private/documents/invoices/orders/'+item.id,'store/public/documents/invoices/Invoice_mandexpa_comments.docx');
                    paths.push(path_seller_invoice);
                    // send mail
                    Helper.notify.sendMail(
                        email_template,
                        [{
                            name:datas.staff_full_name,
                            address:item.seller_email
                        }],
                        {},
                        req
                        )

                }

                // // Create invoice and send mail for buyer
                if(item.buyer_id){
                    //fill data
                    datas.invoice_number = Helper.propertyHelper.create_unique_invoice_number()+endfix.replace('/','');
                    datas.staff_full_name = item.buyer_firstname+ " " +item.buyer_lastname;
                    datas.companyname = item.buyer_reason_social;
                    datas.address = item.buyer_address;
                    datas.zipcode = item.buyer_postalcode;
                    datas.city = item.buyer_city;
                    datas.phone = item.seller_mobile;
                    datas.commission_amount = (item.total_commission_inclusive * (item.commission_buyer /100)).toFixed(2);
                    datas.sub_total = (datas.commission_amount * (invoice_percent_sub_total /100)).toFixed(2);
                    datas.tva_commission  = (datas.sub_total * (invoice_percent_tva /100)).toFixed(2);
                    datas.total = parseFloat(datas.sub_total) + parseFloat(datas.tva_commission) ;

                    // create invoice
                    let filename = "buyer_invoice"+endfix.replace('/','_')+".docx";
                    path_buyer_invoice = Helper.upload.renderWordFile(datas,filename,'store/private/documents/invoices/orders/'+item.id,'store/public/documents/invoices/Invoice_mandexpa_comments.docx');
                    paths.push(path_buyer_invoice);


                    // send mail
                    Helper.notify.sendMail(
                        email_template,
                        [{
                            name:datas.staff_full_name,
                            address:item.buyer_email
                        }],
                        {},
                        req
                    )
                }


                let data_update = {
                    seller_invoice:path_seller_invoice,
                    buyer_invoice:path_buyer_invoice,
                };

                const buyer_invoice = await PropertyReorder.query().update(data_update).where('property_id',item.id);

            });
            // return  Helper.dateHelper.getDateTimeZone('now',"D/MM")+":STATUS:   OK===>";
            return  results;
        }else{
            return null;
        }
    }catch (err) {
        console.log("Invoice error=====>",err);
        return Boom.boomify(err,{ statusCode: 422 })
    }



};

/**
 * Function get list invoices by user in sys
 * @param req
 * @param h
 * @returns {Promise<void>}
 */
exports.listOrderInvoices = async (req,h)=>{
    var actor_id =req.auth.credentials.user.id;
    return  PropertyReorder.query().select('property_reorder.*','property.title_des as property_title',
        'seller.firstname as seller_firstname','seller.lastname as seller_lastname',
        'buyer.firstname as buyer_firstname','buyer.lastname as buyer_lastname',
        'creator.firstname as creator_firstname','creator.lastname as creator_lastname',
        )
        .from('property_reorder')
        .join('property','property.id','property_reorder.property_id')
        .leftJoin('account as seller','seller.id','property_reorder.seller_id')
        .leftJoin('account as buyer','buyer.id','property_reorder.buyer_id')
        .leftJoin('account as creator','property_reorder.created_by','creator.id')
        // .where('property_reorder.created_by',actor_id)
        .where('seller.id',actor_id)
        .orWhere('buyer.id',actor_id)
        .orderBy('property_reorder.date_sale','desc')
        .skipUndefined()
        .then(res=>{
            return res;
        }).catch(err=>{
            return Boom.boomify(err, {statusCode: 422});
        })



};

/**
 * Function get list invoices by Admin
 * @param req
 * @param h
 * @returns {Promise<void>}
 */
exports.listOrderInvoicesAdmin = async (req,h)=>{
    return  PropertyReorder.query().select('property_reorder.*','property.title_des as property_title',
        'seller.firstname as seller_firstname','seller.lastname as seller_lastname',
        'buyer.firstname as buyer_firstname','buyer.lastname as buyer_lastname',
        'creator.firstname as creator_firstname','creator.lastname as creator_lastname',
    )
        .from('property_reorder')
        .join('property','property.id','property_reorder.property_id')
        .leftJoin('account as seller','seller.id','property_reorder.seller_id')
        .leftJoin('account as buyer','buyer.id','property_reorder.buyer_id')
        .leftJoin('account as creator','property_reorder.created_by','creator.id')
        .orderBy('property_reorder.date_sale','desc')
        .skipUndefined()
        .then(res=>{
            return res;
        }).catch(err=>{
            return Boom.boomify(err, {statusCode: 422});
        })

};
