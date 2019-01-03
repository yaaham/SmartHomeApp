const config = require('../env.config');
const TokenValidaation = require('../security/authorization/authorization.validation');
const climaProviders = require('./providers'); 

exports.routesConfig=function(app){
    app.post('/climgen',[//TokenValidaation.validJWTNeeded,
        climaProviders.gen
    ]);
    app.post('/climloc',[//TokenValidaation.validJWTNeeded,
        climaProviders.loc
    ]);
}