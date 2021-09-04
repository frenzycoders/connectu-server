const User = require('./../Routes/user/models/user.model');
const { isSocketAuthenticated } = require('./../MiddleWares/socketAuth');
const { filterContact } = require('./utils');
module.exports = (server) => {
    const io = require('socket.io')(server);
    let user;
    io.on('connection', async (socket) => {
        console.log('new user connected with id' + socket.id);
        let res = await isSocketAuthenticated(socket.handshake.headers.token);
        if (res.status == false) socket.to(socket.id).emit('TOKEN_EXPIRE');
        else {
            socket.on('REQUEST_FILTRED_CONTACTS', async (data) => {
                const userContacts = await filterContact(data, res.user);
                socket.emit('FILTRED_CONTACTS', {contacts:userContacts.contacts});
            })
        }
        socket.on('disconnect', () => {
            console.log('User with socket id' + socket.id + ' is Disconnected')
        })
    })
}