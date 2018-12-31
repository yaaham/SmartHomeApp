const jwt = require('jsonwebtoken'),
    refreshSecret = require('../../env.config.js').actualRefreshSecret,
    crypto = require('crypto');
    fs = require('fs');

const cert = fs.readFileSync('./tls/token-public-key.pem');

exports.validJWTNeeded = (req, res, next) => {
    console.log("hey you 1 ");
    if (req.headers['authorization']) {
        
        try {
            console.log(req.headers['authorization']);
            let authorization = req.headers['authorization'].split(' ');
            console.log(authorization[0]);
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                console.log("Verifie");
                var aud = 'urn:'+(req.get('origin')?req.get('origin'):"boujkhirou.xyz");
                console.log("Verifie");
                req.jwt = jwt.verify(authorization[1], cert, {issuer:"urn:boujkhirou.xyz",audience:aud,algorithms: ['RS512']});
                console.log("Verifie");
                return next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = Buffer.from(req.body.refresh_token, 'base64');
    let decoded = b.toString().split('$');
    let salt = decoded[0];
    let refresh_token = decoded[1];
    let hash = crypto.createHmac('sha512', salt).update(req.jwt.user_id + refreshSecret + req.jwt.jti).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};