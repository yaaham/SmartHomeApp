const config = require('../env.config');
const TokenValidaation = require('../security/authorization/authorization.validation');
const climaProviders = require('./providers'); 

exports.routesConfig=function(app){
    app.post('/climgen',[
        climaProviders.gen
    ]);
    app.post('/climloc',[
        climaProviders.loc
    ]);
}