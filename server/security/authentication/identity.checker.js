const IdentityModel = require('../../identity/models/identity.model');
const uuidv4 = require('uuid/v4');
const validityTime = require('../../env.config.js').jwtValidityTimeInSeconds;
exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }
        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

const bcrypt = require('bcrypt'); 
exports.isPasswordAndUserMatch = (req, res, next) => {
    IdentityModel.findByEmail(req.body.email)
        .then((user)=>{
            console.log(user);
            if(!user){
                res.status(3000).send({});
            }else{
                var passwordFields = user.password;
                
                bcrypt.compare(req.body.password,passwordFields,function (err,result){
                    
                if (result == true) {
                    
                    var now = Math.floor(Date.now() / 1000);
                    
                    req.body = {
                        iss: 'urn:SmartHome.xyz',
                        aud: 'urn:'+(req.get('origin')?req.get('origin'):"SmartHome.xyz"),
                        sub: user.email,
                        name: user.firstName + ' ' + user.lastName,
                        userId: user._id,
                        roles: user.permissionLevel,
                        jti: uuidv4(),
                        iat: now,
                        lat : user.lat,
                        lon : user.lon,
                        rooms : user.rooms,
                        porte : user.porte ,
                        presence :user.presence,
                        exp: now+validityTime
                    };
                    return next();
                } else {
                    return res.status(404).send({errors: ['Invalid e-mail or password']});
                }});
            } 
        });
};

exports.isUserStillExistsWithSamePrivileges = (req, res, next) => {
    IdentityModel.findByEmail(req.body.sub)
        .then((user)=>{
            if(!user[0]){
                res.status(1000).send({});
            }
            req.body.roles = user[0].permissionLevel;
            return next();
        });
};