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
exports.gen=(req,res)=>{
        var client =mqtt.connect('mqtt://m15.cloudmqtt.com' ,options); 
        client.on('connect',function(){
            User.findByEmail(req.body.email).then(user=>{
                    for(var  i=1 ;i<user.rooms.length;i++){
                    if(req.body.ButtonStatus == true){
                        client.subscribe(req.body.email + '/'+user.rooms[i].name+'/lumiere'); 
                        client.publish(req.body.email + '/'+user.rooms[i].name+'/lumiere','1'); 
                        user.rooms[i].lampe = 1; 
                    }
                    else{
                        client.publish(req.body.email + '/'+user.rooms[i].name+'/lumiere','0'); 
                        user.rooms[i].lampe = 0; 
                    }
                }  
                
                user.save();
        });
    });
}

exports.loc=(req,res)=>{
    var client =mqtt.connect('mqtt://m15.cloudmqtt.com' ,options); 
        client.on('connect',function(){
        User.findByEmail(req.body.email).then(user=>{
                for(var  i=1 ;i<user.rooms.length;i++){
                if(req.body.roomname === user.rooms[i].name){
                    if(req.body.ButtonStatus == true){
                    client.subscribe(req.body.email + '/'+user.rooms[i].name+'/lumiere'); 
                    client.publish(req.body.email + '/'+user.rooms[i].name+'/lumiere','1'); 
                    user.rooms[i].lampe = 1; 
                }
                else{
                    client.publish(req.body.email + '/'+user.rooms[i].name+'/lumiere','0'); 
                    user.rooms[i].lampe = 0; 
                }
            }
              
            }
            user.save(); });
    });
}


