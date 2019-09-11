'use strict';
const Hapi = require('hapi');
const Knex = require('knex');
const Inert = require('inert');
const knexConfig = require('./knex');
const { Model } = require('objection');
const Path = require('path');
const Boom = require('boom');
var Account=require('./models/account')
const jwt=require('jsonwebtoken');

require('dotenv').load();

const server = Hapi.server({
    port: parseInt(process.env.PORT, 10) || 2603,
    host: '0.0.0.0',
    routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['sessionid', 'cache-control', 'x-requested-with']
        },
        validate: {
            failAction: async (request, h, err) => {
                if (process.env.NODE_ENV === 'production') {
                    throw Boom.badRequest(`Invalid request payload input`);
                } else {
                    throw err;
                }
            }
        },
        files: {
            relativeTo: Path.join(__dirname, '/store')
        },
    }

});


const knex = Knex(knexConfig.development);
Model.knex(knex);


server.route({
    method: 'GET',
    path: '/',
    config: {
        auth: false
    },
    handler: async function (request, h) {
        let account = await Account.query().findOne({email: 'quan@joombooking.com'});
        return 'Welcome to mandexpa , connected to DB: '+account.email;
    }
});


const scheme =  function(server, options) {
    return {
        api: {
            settings: {
                x: 5
            }
        },
        authenticate: function (request, h) {
            var Boom = require('boom');
            const session_id = request.headers.sessionid;
            if (!session_id) {
                return Boom.unauthorized(null, 'Can not find session id');
            }
            return jwt.verify(request.headers.sessionid,'sessionkey',(err,authData)=>{
                try{
                    return Account.query().findById(authData.id).then((acc)=>{
                        return h.authenticated({ credentials: { user: acc, scope: [acc.type] } });
                    });
                }catch (e) {
                    console.log('Jump CATCH');
                    return Boom.unauthorized(null, 'Session timeout');
                }

            });
        }
    };
};

server.auth.scheme('oo2', scheme);
server.auth.strategy('default', 'oo2');
server.auth.default({
    strategy: 'default'
});




const init = async () => {
    //auto loading routes directories

    await server.register({ plugin: require('./plugins/mailer.plugin') });
    await server.register(Inert);
    await server.register(require('hapi-auto-route'));
    await server.register(require('inert'));
    try{ 
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};


init();