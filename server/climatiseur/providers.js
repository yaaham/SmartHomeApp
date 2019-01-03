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
        console.log("111222");
            User.findByEmail(req.body.email).then(user=>{
                    for(var  i=1 ;i<user.rooms.length;i++){
                    if(req.body.ButtonStatus == true){
                        client.subscribe(req.body.email + '/'+user.rooms[i].name+'/climatiseur'); 
                        client.publish(req.body.email + '/'+user.rooms[i].name+'/climatiseur','1');
                        
                        user.rooms[i].climatiseur = 1;
                    }
                    else{
                        client.publish(req.body.email + '/'+user.rooms[i].name+'/climatiseur','0'); 
                        user.rooms[i].climatiseur = 0; 
                    }
                }  
                user.save(); }).catch(err=>{
                    res.status(200).send({ "success": false, msg :"failed"});
                  });
            
}

exports.loc=(req,res)=>{
    var client =mqtt.connect('mqtt://m15.cloudmqtt.com' ,options); 

        User.findByEmail(req.body.email).then(user=>{ 
                for(var  i=1 ;i<user.rooms.length;i++){
                if(req.body.roomname === user.rooms[i].name){
                    if(req.body.ButtonStatus == true){
                    client.subscribe(req.body.email + '/'+user.rooms[i].name+'/climatiseur'); 
                    client.publish(req.body.email + '/'+user.rooms[i].name+'/climatiseur','1'); 
                    user.rooms[i].climatiseur = 1; 
                }
                else{
                    client.publish(req.body.email + '/'+user.rooms[i].name+'/climatiseur','0'); 
                    user.rooms[i].climatiseur = 0; 
                }
            }
            } 
            user.save(); }).catch(err=>{
                res.status(200).send({ "success": false, msg :"failed"});
              });
            
}

