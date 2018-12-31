const User = require('../identity/models/identity.model');

exports.getrooms =(req,res)=>{
    User.findByEmail( req.body.email).then(user =>{
    var rooms=[];
    for(i=0; i<user.rooms.length; i++){
    rooms.push(user.rooms[i]);
    }
    res.status(200).send({ "success": true, "result": rooms ,"porte": user.porte, "presence": user.alarmpresence,"user": user}); 
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

