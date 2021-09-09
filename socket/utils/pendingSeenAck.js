const mongoose = require('mongoose');

const PendingSeenAckSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    mid: {
        type: String,
        required: true,
    }
});


const PendingSeen = mongoose.model('PendingSeen', PendingSeenAckSchema);

module.exports = {
    PendingSeen,
}