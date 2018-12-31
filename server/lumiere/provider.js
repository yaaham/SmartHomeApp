const  mqtt = require('mqtt');
const User = require('../identity/models/identity.model');
exports.gen=(req,res)=>{
        var client =mqtt.connect('mqtt://127.0.0.1'); 
            
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
}

exports.loc=(req,res)=>{
    var client =mqtt.connect('mqtt://127.0.0.1'); 
        
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
            user.save(); 
    });
}


