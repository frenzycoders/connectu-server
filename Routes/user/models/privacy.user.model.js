const mongoose = require('mongoose');
const { NOBODY, type, EVERYBODY } = require('../enums');

const UserPrivacySchema = new mongoose.Schema({
    onlineStatus: {
        type: String,
        enum: type,
        default: EVERYBODY,
    },
    profile: {
        type: String,
        enum: type,
        default: EVERYBODY,
    },
    bio: {
        type: String,
        enum: type,
        default: EVERYBODY,
    }
});

const UserPrivacy = mongoose.model('')
