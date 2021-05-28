const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('Nouvelle utilisateur');
    socket.on('join', ({ user }) => {
        socket.join(user);
    })

    socket.on('sendMessage', (data, userId) => {
        io.to(userId).emit('newMessage', data);
    });

    socket.on('startTyping', (userId) => {
        socket.to(userId).emit('userStartTyping', true)
    })
    socket.on('stopTyping', (userId) => {
        socket.to(userId).emit('userStopTyping', false)
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            console.log(user.name + ' déconnecté de la room ' + user.room);
            io.to(user.room).emit('message_disconnect', { connected : false});
            socket.broadcast.to(user.room).emit('message_disconnect', { connected : false});
        }
    })
})

app.use(router);

server.listen(PORT, () => console.log(`Le serveur a démarré sur le port ${PORT}`))
