const mongoose = require('mongoose');

const BackupCodesSchema = new mongoose.Schema({
    codes: [{
        type: String,
    }]
}, {
    timestamps: true,
});


const BackupCodes = mongoose.model('BackupCodes', BackupCodesSchema);
module.exports = {
    BackupCodes
}