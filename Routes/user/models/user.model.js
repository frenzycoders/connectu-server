const mongoose = require('mongoose');
const lodash = require('lodash');
const jwt = require('jsonwebtoken');
const bcryptJs = require('bcryptjs');
const access = 'iamjack56';
const secret = 'blackcoder56';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    img: {
        type: String,
        default: null
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        default: null,
    },
    countryCode: {
        type: Number,
        required: true
    },
    token: {
        type: String,
    },
    backupCodes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BackupCodes"
    },
    privacy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserPrivacy"
    },
    security: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSecurity"
    },
    contacts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserContact"
    }   
}, {
    timestamps: true
});

UserSchema.methods.toJSON = function () {
    let User = this;
    let UserObj = User.toObject();
    return lodash.pick(UserObj, ['_id', 'name', 'img', 'countryCode', 'number', 'bio', 'twaFa','contacts']);
}

UserSchema.methods.genUserToken = function () {
    let User = this;
    let token = jwt.sign({ _id: User._id.toHexString(), access }, secret).toString();
    User.token = token;
    return User.save().then(() => {
        return token;
    });
}

UserSchema.statics.findUserByToken = function (token) {
    let User = this;
    let decode;
    try {
        decode = jwt.verify(token, secret);
    } catch (error) {
        return Promise.reject();
    }
    return User.find({
        '_id': decode._id,
        'token': token,
    });
}


UserSchema.pre('save', function (next) {
    let User = this;
    if (User.isModified('password')) {
        bcryptJs.genSalt(7, (err, salt) => {
            bcryptJs.hash(User.password, salt, (err, hash) => {
                User.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
