'use strict';
const Dashboard = require("../controllers/dashboard");


module.exports = [
    {
        method:'GET',
        path:'/dashboard/statistic',
        config:{
            auth:{
                scope:["staff","agency","promoter"]
            }
        },
        handler:Dashboard.statistic
    }
];