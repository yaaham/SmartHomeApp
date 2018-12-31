const config = require('../env.config');
const TokenValidaation = require('../security/authorization/authorization.validation');
const AlarmeProviders = require('./providers'); 

exports.routesConfig=function(app){
    app.post('/alarmedepresence',[
        AlarmeProviders.presence
    ]);
    app.post('/porte',[
    AlarmeProviders.porte
    ])
}