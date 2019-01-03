const config = require('../env.config');
const TokenValidaation = require('../security/authorization/authorization.validation');
const RoomProviders = require('./providers'); 


exports.routesConfig=function(app){
    app.post('/getroom',[TokenValidaation.validJWTNeeded,
        RoomProviders.getrooms
    ]);
    app.post('/addroom',[TokenValidaation.validJWTNeeded,
        RoomProviders.add
    ])
}