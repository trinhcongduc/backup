
const INIT_STATE = {
    currencies:[
        {
            label:'EURO',
            // symbol:"€",
            value:"EUR"
        },
        {
            label:'LUF',
            // symbol:"€",
            value:"LUF"
        },
        {
            label:'GBP',
            // symbol:"€",
            value:"GBP"
        },
        {
            label:'USD',
            // symbol:"$",
            value:"USD"
        },
        {
            label:'CDN',
            // symbol:"€",
            value:"CDN"
        },
        {
            label:'SKK',
            // symbol:"€",
            value:"SKK"
        },
        {
            label:'HUF',
            // symbol:"€",
            value:"HUF"
        }
    ],
    status_mandates:[
        {
            type:"Non selectionné",
            value:-1
        },
        {
            type:"Actif",
            value:160
        },
        {
            type:"Vendu",
            value:169
        },
        {
            type:"Réservé",
            value:168
        },
        {
            type:"Loué",
            value:167
        }
    ],
    type_mandates:[
        {
            type:"Non selectionné",
            value:-1
        },
        {
            type:"mandat exclusif",
            value:25
        },
        {
            type:"mandat exclusif",
            value:30
        },
        {
            type:"mandat simple",
            value:29
        }
    ],
    type_charges:[
        {
            value:"2014",
            label:"Prix au m²"
        },
        {
            value:"2008",
            label:"Prix au m² par an"
        },
        {
            value:"2012",
            label:"Prix au m² par jour"
        },
        {
            value:"2010",
            label:"Prix au m² par mois"
        },
        {
            value:"2011",
            label:"Prix au m² par semaine"
        },
        {
            value:"2009",
            label:"Prix au m² pour 6 mois"
        },
        {
            value:"596",
            label:"annuellement"
        },
        {
            value:"598",
            label:"semestriellement"
        },
        {
            value:"597",
            label:"mensuellement"
        },
        {
            value:"599",
            label:"hebdomadaire"
        },
        {
            value:"601",
            label:"quotidien"
        },
        {
            value:"3616",
            label:"Per Day + Fees"
        },
        {
            value:"3618",
            label:"Per Month + Fees"
        },
        {
            value:"3619",
            label:"Per Semester + Fees"
        },
        {
            value:"3617",
            label:"Per Week + Fees"
        },
        {
            value:"3476",
            label:"Per Year + Fees"
        },
        {
            value:"2013",
            label:"Price Per Object"
        },
    ]



};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        default:
            return {...state} ;
    }
}
