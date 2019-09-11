const constants = {
    USER_ROLES: {
        STAFF: 'staff',
        AGENCY: 'agency',
        ADMIN: 'admin',
        PROMOTER: 'promoter',
    },
    PERMISSION_STATES: {
      INCLUDED: 'Included',
      EXCLUDED: 'Excluded',
      FORBIDDEN: 'Forbidden'
    },
    
    AUTH_STRATEGIES: {
      TOKEN: 'standard-jwt',
      SESSION: 'jwt-with-session',
      REFRESH: 'jwt-with-session-and-refresh-token'
    },
    EXPIRATION_PERIOD: {
      SHORT: '10m',
      MEDIUM: '4h',
      LONG: '730h'
    },
    AUTH_ATTEMPTS: {
      FOR_IP: 50,
      FOR_IP_AND_USER: 5
    },
    LOCKOUT_PERIOD: 30, // in units of minutes
    API_TITLE: 'appy API',
    WEB_TITLE: 'appy Admin',
    WEB_NAME : "Mandexpa",
    NAMEOBJECT:[
        {id:1, name:"Acheteur"},
        {id:2, name:"Vendeur"},
        {id:3, name:"Propriétaire"},
        {id:4, name:"Locataire"},
        {id:5, name:"Investisseur"},
        {id:6, name:"Commerçant"},
        {id:7, name:"Promoteur"},
        {id:8, name:"Constructeur"},
    ]
  };

module.exports = constants;