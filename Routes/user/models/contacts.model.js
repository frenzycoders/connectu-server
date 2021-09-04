const mongoose = require('mongoose');

const UserContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    contacts: [{
        contactId: {
            type: String
        },
        id: {
            type: String
        },
        number: {
            type: String
        },
        connected: {
            type: Boolean,
            default: false
        },
        displayName: {
            type: String,
        },
        serverName: {
            type: String,
        },
        status: {
            type: String,
        },
        img: {
            type: String,
        }
    }]
}, {
    timestamps: true
});

const UserContact = mongoose.model('UserContact', UserContactSchema);
module.exports = {
    UserContact
}