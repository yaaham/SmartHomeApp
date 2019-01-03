const  mqtt = require('mqtt');
const User = require('../identity/models/identity.model');

var options= {
    port: 18699,
    host: 'mqtt://m15.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'boujkhirou',
    password: 'boujkhirou',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
}
exports.presence=(req,res)=>{
    console.log("heyyyy");
        var client =mqtt.connect('mqtt://m15.cloudmqtt.com' ,options); 
        client.on('connect',function(){
            User.findByEmail(req.body.email).then(user=>{
                    if(req.body.ButtonStatus == true){
                        client.subscribe(req.body.email + '/alarme/presence'); 
                        client.publish(req.body.email + '/alarme/presence','1'); 
                        user.presence = 1; 
                    }
                    else{
                        client.publish(req.body.email + '/alarme/presence','0'); 
                        user.presence = 0; 
                    }
                    
                });
                user.save(); });
        
}

exports.porte = (req,res)=>{
    
var client =mqtt.connect('mqtt://m15.cloudmqtt.com' ,options); 
client.on('connect',function()
   { User.findByEmail( req.body.email).then(user=>{
            if(req.body.ButtonStatus == true){
                client.subscribe(req.body.email + '/alarme/porte'); 
                client.publish(req.body.email + '/alarme/porte','1'); 
                user.porte = 1; 
                user.save();
            }
            else{
                client.publish(req.body.email + '/alarme/porte','0'); 
                user.porte = 0; 
                user.save();
            }
        });
         });
}

