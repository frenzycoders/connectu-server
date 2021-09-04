const mongoose = require('mongoose');

const UserSecuritySchema = new mongoose.Schema({
    twoFA: {
        type: Boolean,
        default: false,
    },
    code: {
        type: String
    },
    isLockPassword: {
        type: Boolean,
        default: false,
    },
    lockPassword: {
        type: String,
    },
    deactivateAc: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

UserSecuritySchema.pre('save', function (next) {
    let UserSecurity = this;
    if (UserSecurity.isModified('code')) {
        bcryptJs.genSalt(7, (err, salt) => {
            bcryptJs.hash(UserSecurity.code, salt, (err, hash) => {
                UserSecurity.code = hash;
                next();
            });
        });
    } else {
        next();
    }
    if (UserSecurity.isModified('lockPassword')) {
        bcryptJs.genSalt(7, (err, salt) => {
            bcryptJs.hash(UserSecurity.lockPassword, salt, (err, hash) => {
                UserSecurity.lockPassword = hash;
                next();
            });
        });
    } else {
        next();
    }
});
const UserSecurity = new mongoose.model('UserSecurity', UserSecuritySchema);

module.exports = { UserSecurity }