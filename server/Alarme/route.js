const config = require('../env.config');
const AlarmeProviders = require('./providers'); 

exports.routesConfig=function(app){
    app.post('/alarmedepresence',[
        AlarmeProviders.presence
    ]);

}