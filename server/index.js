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
        users.map(user => {
            if (user !== user1) {
                io.to(user.idUser).emit('message', { user, connected : true});
            }
        })
    })

    socket.on('sendMessage', (data, userId) => {
        io.to(parseInt(userId)).emit('newMessages', data);
    });

    socket.on('sendConversation', (data, userId, contentId) => {
        io.to(parseInt(userId)).emit('newConversation', data, contentId);
    });

    socket.on('startTyping', (userId, conversationId) => {
        socket.to(parseInt(userId)).emit('userStartTyping', true, conversationId)
    })
    socket.on('stopTyping', (userId, conversationId) => {
        socket.to(parseInt(userId)).emit('userStopTyping', false, conversationId)
    })

    socket.on('disconnect', () => {
        const user1 = removeUser(socket.id);
        users.map(user => {
            if (user !== user1) {
                io.to(user.idUser).emit('message', {user1, connected: false});
            }
        })
    })
})


server.listen(PORT, () => console.log(`Le serveur a démarré sur le port ${PORT}`))
sslServer.listen(PORTSSL, () => console.log(`Le serveur a démarré sur le port ${PORTSSL}`))
