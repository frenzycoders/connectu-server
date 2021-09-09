const User = require('./../Routes/user/models/user.model');
const { isSocketAuthenticated } = require('./../MiddleWares/socketAuth');
const { filterContact } = require('./utils');
const { SocketManager } = require('./utils/socketManager');
const { UserContact } = require('../Routes/user/models/contacts.model');
const { PendingChats } = require('./utils/PendingChats');
const { MessageReciever } = require('./utils/pendingRecieveAck');
const { PendingSeen } = require('./utils/pendingSeenAck')
module.exports = (server) => {
    const io = require('socket.io')(server);
    let user;
    io.on('connection', async (socket) => {
        console.log('new user connected with id' + socket.id);
        let res = await isSocketAuthenticated(socket.handshake.headers.token);
        if (res.status == false) socket.to(socket.id).emit('TOKEN_EXPIRE');
        else {
            io.emit('USER_CONNECTED', res.user._id);
            let user = await SocketManager.findOne({ userId: res.user._id });
            if (!user) {
                let socket_manager = await SocketManager.create({ userId: res.user._id, number: res.user.number, socketId: socket.id, status: true, lastseen: null });
            } else {
                let socket_manager = await SocketManager.findOneAndUpdate({ userId: res.user._id }, { socketId: socket.id, status: true, lastseen: null });
            }
            let pending_messages = await PendingChats.find({ reciever_id: res.user._id });
            if (pending_messages.length > 0) socket.emit('PENDING_MESSAGES', pending_messages);
            socket.on('REQUEST_FILTRED_CONTACTS', async (data) => {
                const userContacts = await filterContact(data, res.user);
                socket.emit('FILTRED_CONTACTS', { contacts: userContacts.contacts });
            })

            socket.on('MESSAGE_SEND_REQUEST', async (data) => {
                let socketId = await fetchSocketIdofOnlineUserById(data.reciever_id);
                if (socketId == null) {
                    await PendingChats.create(data);
                    socket.emit('MESSAGE_SEND', data.messageId);
                } else {
                    console.log(data)
                    socket.to(socketId).emit('RECIEVE_MESSAGE', data);
                    socket.emit('MESSAGE_SEND', data.messageId);
                }
            });

            socket.on('MESSAGE_RECIEVED_ACKNOLEDGEMENT', async (data) => {
                let uid = data.id.split('@')[1];
                let socketId = await fetchSocketIdofOnlineUserById(uid);
                if (socketId == null) {
                    await MessageReciever.create({ number: data.id.split('@')[2], messageId: data.id });
                } else {
                    console.log(data);
                    io.to(socketId).emit('MESSAGE_RECIEVED_EVENT', data);
                }
            });

            socket.on('MESSAGE_SEEN_EVENT_FOR USER', async (data) => {
                let uid = data.mid.split('@')[1];
                let socketId = await fetchSocketIdofOnlineUserById(uid);
                if (socketId == null) {
                    await PendingSeen.create({ number: data.mid.split('@')[2], mid: data.mid });
                } else {
                    socket.to(socketId).emit('MESSAGE_SEEN_RESPONSE', data);
                }
            });

            socket.on('CHECK_USER_ONLINE', async (data) => {
                let user = await SocketManager.findOne({ userId: data });
                socket.emit('USER_ONLINE_STATUS', { id: user.userId, status: user.status, lastseen: user.lastseen });
            })
        }
        socket.on('disconnect', async () => {
            console.log('User with socket id' + socket.id + ' is Disconnected')
            let last_seen = Date.now().toString();
            let user = await SocketManager.findOneAndUpdate({ socketId: socket.id }, { status: false, lastseen: last_seen, });
            io.emit('USER_OFFLINE_GLOBAL', { "id": user.userId, "lastseen": last_seen });
        })
    })
}


const fetchSocketIdofOnlineUserById = async (id) => {
    try {
        let user = await SocketManager.findOne({ userId: id });
        if (user.status) return user.socketId;
        else return null;
    } catch (error) {
        return error;
    }
}