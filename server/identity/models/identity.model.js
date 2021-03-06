const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/smarts',{useNewUrlParser: true});
const Schema = mongoose.Schema;

const identiySchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    lat:Number,
    lon:Number,
    rooms: [{name: String,temperature: Number, humidite: Number, lampe: Number, climatiseur: Number, alumauto: String, climaauto:String, alumlocation: String,climalocation:String}],
    permissionLevel: Number,
    porte : Number ,
    presence : Number
});

identiySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
identiySchema.set('toJSON', {
    virtuals: true
});

identiySchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const Identity = mongoose.model('Users', identiySchema);


exports.findByEmail = (email) => {
    return Identity.findOne({email: email});
};
exports.findById = (id) => {
    return Identity.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};


exports.patch = (email, userData) => {
    return new Promise((resolve, reject) => {
        Identity.findOneAndUpdate({email: email},{ $set:userData}, function (err, user) {
            if (err) reject(err);
            resolve(user);
            
        });
    });
};

exports.createIdentity = (userData) => {
    const user = new Identity(userData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Identity.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.putIdentity = (id,identityData) => {
    return new Promise((resolve, reject) => {
        Identity.findByIdAndUpdate(id,identityData,function (err,user) {
            if (err) reject(err);
            resolve(user);
        });
    });
};

exports.patchIdentity = (id, userData) => {
    return new Promise((resolve, reject) => {
        Identity.findById(id, function (err, user) {
            if (err) reject(err);
            let actualPermisssion = user.permissionLevel;
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.permissionLevel = actualPermisssion;
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    });

};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        Identity.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
