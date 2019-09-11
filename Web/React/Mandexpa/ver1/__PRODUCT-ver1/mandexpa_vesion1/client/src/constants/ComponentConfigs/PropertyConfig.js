//Property type & kind


export const PROPERTY_TYPE  = {
    type:{
        SALE:"sale",
        RENT:"rent",
    },
    kind:{
        COMMERCIAL:"commercial",
        RESIDENTIAL:"residential",
    }
};

// Status of the property
export const status_property={
    sale:[
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
            label:'Sous-compromis',
            value:'NEGOTIATING',
            color:'#ff9900',
        },
        {
            label:'Vendu',
            value:'SOLD_SUCCESS',
            color:'#ff9900',
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
    ],
    rent:[
        {
            label:'A louer',
            value:'FOR_RENT',
            color:'#22e238',
        },
        {
            label:'Réservé',
            value:'BOOKED',
            color:'#005dff',
        },
        {
            label:'Loué',
            value:'RENTED',
            color:'#ff9900',
        },
        {
            label:'Annulé',
            value:'CANCELLED',
            color:'#ff0000',
        },
    ],
};


// Type mandate of the property: is the type of contract between the real estate agency and the owner of the property
export const type_mandate_property=[
    {
        label:'Mandat exclusif',
        value:'EXCLUSIVE_MANDATE',
    },
    {
        label:'Mandat semi-exclusif',
        value:'SEMI_EXCLUSIVE_MANDATE',
    },
    {
        label:'Mandat simple',
        value:'SIMPLE_MANDATE',
    },
];
// Sector
export const sector_location=[
    {
        label:'Centre',
        value:'center',
    },
    {
        label:'Est',
        value:'east',
    },
    {
        label:'Nord',
        value:'north',
    },
    {
        label:'Sud',
        value:'south',
    },
    {
        label:'Ouest',
        value:'west',
    },
];
//Type of Property
export const types_property=[
    {
        label:'Maison',
        value:'house',
        child:[
            {label:'Maison',value:'Maison'},
            {label:'Maison jumelée',value:'Maison jumelée'},
            {label:'Maison mitoyenne',value:'Maison mitoyenne'},
            {label:'Maison de maître',value:'Maison de maître'},
            {label:'Maison individuele',value:'Maison individuele'},
            {label:'Maison à rénover',value:'Maison à rénover'},
            {label:'Maison bi-familiale',value:'Maison bi-familiale'},
            {label:'Gros-oeuvre',value:'Gros-oeuvre'},
            {label:'Ferme',value:'Ferme'},
            {label:'Fermette',value:'Fermette'},
            {label:'Villa',value:'Villa'},
            {label:'Maison de ville',value:'Maison de ville'},
            {label:'Maison de village',value:'Maison de village'},
            {label:'Propriété',value:'Propriété'},
            {label:'Chalet',value:'Chalet'},
            {label:'Bungalow',value:'Bungalow'},
            {label:'Château',value:'Château'},
            {label:'Autre : Préciser',value:'Autre'},
        ]
    },
    {
        label:'Appartement',
        value:'apartment',
        child:[
            {label:'Appartement',value:'Appartement'},
            {label:'Duplex',value:'Duplex'},
            {label:'Triplex',value:'Triplex'},
            {label:'Penthouse',value:'Penthouse'},
            {label:'Loft',value:'Loft'},
            {label:'Chambre',value:'Chambre'},
            {label:'Studio',value:'Studio'},
            {label:'Appartement meublé',value:'Appartement meublé'},
        ]
    },
    {
        label:'Résidence',
        value:'residence',
        child:[
            {label:'Résidence',value:'Résidence'},
            {label:'Nouvelle construction',value:'Nouvelle construction'},
            {label:'Résidence en construction',value:'Résidence en construction'},

        ]
    },
    {
        label:'Immeuble de rapport',
        value:'investment_property',
        child:[
            {label:'Immeuble de rapport',value:'Immeuble de rapport'},
            {label:'Maison de rapport',value:'Maison de rapport'},

        ]
    },
    {
        label:'Projet de construction',
        value:'building_project',
    },
    {
        label:'Garage',
        value:'garage',
        child:[
            {label:'Box fermé',value:'Box fermé'},
            {label:'Emplacement intérieur',value:'Emplacement intérieur'},
            {label:'Emplacement extérieur',value:'Emplacement extérieur'},
        ]
    },
    {
        label:'Terrain',
        value:'ground',
        child:[
            {label:'Terrain',value:'Terrain'},
            {label:'Terrain à bâtir',value:'Terrain à bâtir'},
            {label:'Terrain agricole',value:'Terrain agricole'},
            {label:'Terrain pour loisir',value:'Terrain pour loisir'},
            {label:'Terrain industriel',value:'Terrain industriel'},
            {label:'Gros-oeuvre',value:'Gros-oeuvre'},
        ]
    },
    {
        label:'Local commercial',
        value:'commercial_premises',
        child:[
            {label:'Local commercial',value:'Local commercial'},
            {label:'Commerce',value:'Commerce'},
            {label:'Bureau',value:'Bureau'},
            {label:'Entrepôt',value:'Entrepôt'},
            {label:'Dépôt',value:'Dépôt'},
            {label:'Restaurant',value:'Restaurant'},
            {label:'Hôtel',value:'Hôtel'},
            {label:'Local pour professions libérales',value:'Local pour professions libérales'},
            {label:'Hangar',value:'Hangar'},
            {label:'Archives',value:'Archives'},
        ]
    },
    {
        label:'Fonds de commerce',
        value:'commercial_property',
    },
    {
        label:'Centre d\'affaires',
        value:'business_centre',
    },
    {
        label:'Local industriel',
        value:'Industrial premises',
    }
];

// Type of price Property

export const type_prices=[
    {
        label:'Monthly renting',
        value:'monthly_rent',
    },
    {
        label:'Call price',
        value:'call_price',
    },
    {
        label:'Minimum price',
        value:'min_price',
    },
    {
        label:'Negotiable price',
        value:'negotiable_price',
    },
    {
        label:'Fixed price',
        value:'fixed_price',
    },
    {
        label:'Superior offer',
        value:'superior_offer',
    }
];

export const property_match_search_type={
  SEARCH_ALL_FIELD:"SEARCH_ALL_FIELD",
  LEAST_ONE_FIELD:"LEAST_ONE_FIELD",
};
export const types_confirm_collaberate = {
    request_by_seller: "REQUEST",
    confirm_by_buyer: "CONFIRM",
    vadidate_by_seller:"VADIDATE",
};

export const property_public_marketing = {
    at_home:{
        label:'At home',
        color: '#af0c0c'
    },
    wortimmo:{
        label:'Wortimmo',
        color: '#624bf4'
    },
    immo_lu:{
        label:'Immo.lu',
        color: '#049fd3'
    },
    immotop:{
        label:'Immotop',
        color: '#f46118'
    },
    luxbazard:{
        label:'Luxbazard',
        color: '#258906'
    },
    editus_home:{
        label:'Editus Home',
        color: '#9da803'
    },
    distribution_flyers: {
        label:'Distribution',
        color: '#9308dd'
    },
    editus_lu: {
        label:'Editus lu',
        color: '#7c4706'
    },
    luxembourg_wort: {
        label:'Luxembourd',
        color: '#018e83'
    },
};
