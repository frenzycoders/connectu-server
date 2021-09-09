const mongoose = require('mongoose');
const MessageRecieveSchema = new mongoose.Schema({
    number: {
        type: String, required: true,
    },
    messageId: {
        type: String,
    }
}, {
    timestamps: true
})


const MessageReciever = mongoose.model('MessageReciever',MessageRecieveSchema);

module.exports = {
    MessageReciever
}