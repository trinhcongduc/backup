const PropertyMatchController = require("../controllers/property_match");

module.exports=[
    {
        method:'POST',
        path:'/property-matches/create',
        config:{
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyMatchController.create
    },
    {
        method: 'GET',
        path: '/property-matches/list',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: PropertyMatchController.list
    },
    {
        method: 'GET',
        path: '/property-matches/edit/{id}',
        config: {
            auth: {
                scope: ['admin','staff','promoter','agency']
            },
        },
        handler: PropertyMatchController.get
    },
    {
        method:'POST',
        path:'/property-matches/update',
        config:{
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyMatchController.update
    },
    {
        method:'GET',
        path:'/property-matches/matching/{id}',
        config:{
            auth:{
                scope:['promoter','agency','staff']
            }
        },
        handler:PropertyMatchController.matching
    }
];