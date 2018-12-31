const User = require('../identity/models/identity.model');

exports.getrooms =(req,res)=>{
    User.findByEmail( req.body.email).then(user =>{
    console.log(user);
    console.log("salam");
    var rooms=[];
    for(i=0; i<user.rooms.length; i++){
    rooms.push(user.rooms[i]);
    }
    res.status(200).send({ "success": true, "result": rooms ,"porte": user.porte, "presence": user.alarmpresence,"user": user}); 
});
}

