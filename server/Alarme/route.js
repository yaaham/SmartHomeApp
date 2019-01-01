const config = require('../env.config');
const TokenValidaation = require('../security/authorization/authorization.validation');
const AlarmeProviders = require('./providers'); 

exports.routesConfig=function(app){
    app.post('/alarmedepresence',[TokenValidaation.validJWTNeeded,
        AlarmeProviders.presence
    ]);
    app.post('/porte',[TokenValidaation.validJWTNeeded,
    AlarmeProviders.porte
    ])
}