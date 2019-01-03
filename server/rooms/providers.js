const User = require('../identity/models/identity.model');
const mqtt = require('mqtt');

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

exports.getrooms =(req,res)=>{
  var client = mqtt.connect('mqtt://m15.cloudmqtt.com', options);
  client.on('connect',function(){
    console.log('connected to cloud mqtt');
    User.findByEmail( req.body.email).then(user =>{
    var rooms=[];
    for(i=0; i<user.rooms.length; i++){
      client.subscribe(req.body.email + '/'+user.rooms[i].name, function(){
         client.on('message', function(topic, message, packet) {
           
          var objectValue = JSON.parse(message);
          var data =  {
            "temperature" : objectValue.d.temperature,
            "humidite":objectValue.d.humidite,
            "name":objectValue.d.name
            }
            var rom=user
            for (j=0 ;j<user.rooms.length;j++){
              if(user.rooms[j].name==data.name){
                rom.rooms[j].humidite = data.humidite;
                rom.rooms[j].temperature=data.temperature;
              }
            }
            User.patch(user.email, rom).then((result) => {
              //res.status(204).send(result);
          });
        });
      });
      rooms.push(user.rooms[i]);
    }
    user.save();
    res.status(200).send({ "success": true, "result": rooms ,"porte": user.porte, "presence": user.alarmpresence,"user": user}); 
}).catch(err=>{
  res.status(200).send({ "success": false, msg :"failed"});
});

});
}
exports.add=(req ,res )=>{
  User.findByEmail( req.body.email).then(user =>{
    console.log(req.body.roomname);
  var room={name:req.body.roomname, temperature: 00, humidite: 00,lampe: 0 ,climatiseur: 0 ,alarmpresence:0, porte:0}
  user.rooms.push(room);
  user.save();
  res.status(200).send({ "success": true, "result": user.rooms ,"porte": user.porte, "presence": user.alarmpresence,"user": user}); 
}
);
}

