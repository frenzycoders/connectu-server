const mongoose = require('mongoose');

const PendingChatsSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    message_sendtime: {
        type: String,
    },
    file: {
        type: String,
    },
    sender_number: {
        type: String
    },
    sender_id: {
        type: String,
    },
    reciever_number: {
        type: String
    },
    reciever_id: {
        type: String,
    },
    reciever_meta: {
        _id: {
            type: String
        },
        name: {
            type: String
        },
        number: {
            type: String
        },
        img: {
            type: String
        },
        bio: {
            type: String
        },
        contactid: {
            type: String
        }
    },
    sender_meta: {
        _id: {
            type: String
        },
        name: {
            type: String
        },
        number: {
            type: String
        },
        img: {
            type: String
        },
        bio: {
            type: String
        },
        contactid: {
            type: String
        }
    }
}, {
    timestamps: true,
});


const PendingChats = mongoose.model('PendingChats', PendingChatsSchema);

module.exports = {
    PendingChats,
}