const refreshSecret = require('../../env.config.js').actualRefreshSecret;
const jwt = require('jsonwebtoken');
const validityTime = require('../../env.config.js').jwtValidityTimeInSeconds;
const crypto = require('crypto');
const fs = require('fs');
const cert = fs.readFileSync('./tls/token-key.pem');

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + refreshSecret + req.body.jti;
        let salt = crypto.randomBytes(16).toString("base64");
        let hash = crypto
          .createHmac("sha512", salt)
          .update(refreshId)
          .digest("base64");
        let token = jwt.sign(req.body, cert, { algorithm: "RS512" });
        let b = Buffer.from(hash);
        let refresh_token = salt + "@" + b.toString("base64");
        return res.status(201).send({accessToken: token, 
            refreshToken: refresh_token ,
            email : req.body.sub ,
            id:req.body.id, 
            porte : req.body.porte , 
            presence : req.body.presence ,
            rooms :req.body.rooms ,
            userlat :req.body.lat , 
            userlong : req.body.lon 
            });
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.refresh_token = (req, res) => {
    try {
        var now = Math.floor(Date.now() / 1000);
        req.body.iat = now;
        req.body.exp = now + validityTime;
        let token = jwt.sign(req.body,cert, { algorithm: 'RS512'});
        res.status(201).send({access_token: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.resetRefreshSecret = (req, res) => {
    try {
        config.initRefreshSecret();
        res.status(204).send({});
    }catch (err) {
        res.status(500).send({errors: err});
    }
};