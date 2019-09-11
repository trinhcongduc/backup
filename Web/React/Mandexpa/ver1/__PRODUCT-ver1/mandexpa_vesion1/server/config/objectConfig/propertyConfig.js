const property_config = {
    path_property_client: "http://35.181.43.240/app/dashboard/property/edit/",
    pirceConfig :{
        invoice_percent_sub_total:10,
        invoice_percent_tva:17,
    },

    type_mandate: {
        for_sale: "FOR_SALE",
        for_rent: "FOR_RENT",
        booked:'BOOKED',
        cancelled: 'CANCELLED',
        sold_success:'SOLD_SUCCESS',
        sold: 'SOLD',
        rented: 'RENTED',
        negotiating:'NEGOTIATING',
    },
    type:{
        SALE:'sale',
        RENT:'rent',
    },
    status_property: {
        sale: {
            FOR_SALE: 'FOR_SALE',
            SOLD: 'SOLD',
            NEGOTIATING: 'NEGOTIATING',
            SOLD_SUCCESS: 'SOLD_SUCCESS',
            CANCELLED: 'CANCELLED',
            BOOKED:'BOOKED',

        },
        rent: {
            FOR_RENT: 'FOR_RENT',
            RENTED: 'RENTED',
            NEGOTIATING: 'NEGOTIATING',
            SOLD_SUCCESS: 'SOLD_SUCCESS',
            CANCELLED: 'CANCELLED',
            BOOKED:'BOOKED',
        }

    },
    title_mandate : [
        {
            label:'A vendre',
            value:'FOR_SALE',
            color:'#005dff',
        },
        {
            label:'Réservé',
            value:'BOOKED',
            color:'#22e238',
        },
        {
            label:'Accord de banque accepté',
            value:'SOLD',
            color:'#ff9900',
        },
        {
            label:'Annulé',
            value:'CANCELLED',
            color:'#ff0000',
        },
        {
            label:'A louer',
            value:'FOR_RENT',
            color:'#22e238',
        },
        {
            label:'Loué',
            value:'RENTED',
            color:'#ff9900',
        },
    ],
    types_confirm_collaberate:{
        request_by_seller: "REQUEST",
        confirm_by_buyer: "CONFIRM",
        vadidate_by_seller:"VADIDATE",
    }

};

module.exports = property_config;