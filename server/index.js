const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const { addUser, removeUser, getUsers } = require('./users');
const PORT = process.env.PORT || 55000;
const PORTSSL = process.env.PORT || 15000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app);
app.use(router);
app.use(cors());
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    const users = getUsers()
    socket.on('join', ({ user }) => {
        const user1 = addUser({id: socket.id, idUser: user})
        socket.join(user);
        users.map(u => {
            if (u.idUser !== user) {
                io.to(u.idUser).emit('message', { user, connected : true});
            }
        })
    })

    socket.on('sendMessage', (data, userId) => {
        console.log(data)
        io.to(parseInt(userId)).emit('newMessages', data);
    });

    socket.on('sendConversation', (data, userId, contentId) => {
        io.to(parseInt(userId)).emit('newConversation', data, contentId);
    });

    socket.on('updateMessageToRead', (conversationId, messageId, userId) => {
        io.to(parseInt(userId)).emit('updateMessage', conversationId, messageId);
    })

    socket.on('startTyping', (userId, conversationId) => {
        socket.to(parseInt(userId)).emit('userStartTyping', true, conversationId)
    })
    socket.on('stopTyping', (userId, conversationId) => {
        socket.to(parseInt(userId)).emit('userStopTyping', false, conversationId)
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            console.log(user.name + ' déconnecté de la room ' + user);
            io.to(user.room).emit('message_disconnect', { connected : false});
            socket.broadcast.to(user.room).emit('message_disconnect', { connected : false});
        }
    })
})


server.listen(PORT, () => console.log(`Le serveur a démarré sur le port ${PORT}`))
sslServer.listen(PORTSSL, () => console.log(`Le serveur a démarré sur le port ${PORTSSL}`))
