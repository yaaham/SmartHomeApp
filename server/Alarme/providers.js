const  mqtt = require('mqtt');
const User = require('../identity/models/identity.model');
exports.presence=(req,res)=>{
        console.log("heyy you !!");
        var client =mqtt.connect('mqtt://127.0.0.1:1880'); 
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
                    
                
                user.save(); });
        });
}

exports.porte = (req,res)=>{
var client =mqtt.connect('mqtt://127.0.0.1:1880'); 
client.on('connect',function(){
            
    User.findByEmail( req.body.email).then(user=>{
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

