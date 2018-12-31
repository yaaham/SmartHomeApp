const config = require('../env.config');
const TokenValidaation = require('../security/authorization/authorization.validation');
const RoomProviders = require('./providers'); 

exports.routesConfig=function(app){
    app.post('/getroom',[
        RoomProviders.getrooms
    ]);
    app.post('/addroom',[
        RoomProviders.add
    ])
}