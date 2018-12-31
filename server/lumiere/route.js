const config = require('../env.config');
const TokenValidaation = require('../security/authorization/authorization.validation');
const LumProviders = require('./provider'); 

exports.routesConfig=function(app){
    app.post('/lumgen',[
        LumProviders.gen
    ]);
    app.post('lamploc',[
    LumProviders.loc
    ]);
}