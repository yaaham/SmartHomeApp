const TokenValidaation = require('../security/authorization/authorization.validation');
const  mqtt = require('mqtt');
const User = require('../identity/models/identity.model');
exports.presence=(req,res)=>{
    TokenValidaation.validJWTNeeded;
    if(err){
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
    else{
        var client =mqtt.connect('mosquito'); 
        client.on('connect',function(){
            User.findOne({username: req.body.username},function(err,user){
                if(err){
                    return res.status(500).send({"sucess ":false , message : "Failed to find User"});
                }
                else{
                    if(req.body.ButtonStatus == true){
                        client.subscribe(req.body.username + '/alarme/porte'); 
                        client.publish(req.body.username + '/alarme/porte','1'); 
                        user.porte = 1; 
                    }
                    else{
                        client.publish(req.body.username + '/alarme/porte','0'); 
                        user.porte = 0; 
                    }
                    
                }
                User.putIdentity; })
        })
    }



}