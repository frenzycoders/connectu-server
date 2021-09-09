const mongoose = require('mongoose');

const SocketManagerSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
        unique:true
    },
    number:{
        type:String,
        unique:true,
    },
    socketId:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Boolean,
        required:true
    },
    lastseen:{
        type:String,
    }
});

const SocketManager = mongoose.model('SocketManager',SocketManagerSchema);

module.exports = {
    SocketManager
}