const config = require('../env.config');
const TokenValidaation = require('../security/authorization/authorization.validation');
const LumProviders = require('./provider'); 

exports.routesConfig=function(app){
    app.post('/lumgen',[//TokenValidaation.validJWTNeeded,
        LumProviders.gen
    ]);
    app.post('/lamploc',[//TokenValidaation.validJWTNeeded,
    LumProviders.loc
    ]);
}