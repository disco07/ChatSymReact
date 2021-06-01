const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUsers } = require('./users');
const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

app.use(router);

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
        console.log(data)
        io.to(userId).emit('newMessage', data);
    });

    socket.on('startTyping', (userId, conversationId) => {
        socket.to(userId).emit('userStartTyping', true, conversationId)
    })
    socket.on('stopTyping', (userId, conversationId) => {
        socket.to(userId).emit('userStopTyping', false, conversationId)
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
